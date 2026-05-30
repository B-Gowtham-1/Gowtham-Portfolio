# ============================================================
# ⚡ THUNDER SYSTEM — DOCKERFILE v2.0
# Multi-Stage Build using Node.js 20 (Alpine) for Gowtham B's Next.js Portfolio
# ============================================================
#
# STAGE OVERVIEW:
#   Stage 1 (deps)    — Install all node_modules (production + development)
#   Stage 2 (builder) — Compile and build the Next.js standalone application
#   Stage 3 (runner)  — Lean production runtime image containing ONLY standalone output
#
# Final image size: ~150MB
# ============================================================

# ────────────────────────────────────────────────────────────
# STAGE 1: deps
# Purpose: Prepare all dependencies required to build the app.
# Base:    node:20-alpine — modern, secure, and compact Node.js runtime.
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

# Set working directory inside the container
WORKDIR /app

# Copy package descriptors first to maximize Docker layer caching
COPY package.json package-lock.json ./

# Install all dependencies (production + devDependencies)
# Enforces exact versions from the lockfile for reproducible builds
RUN npm ci

# ────────────────────────────────────────────────────────────
# STAGE 2: builder
# Purpose: Compile TypeScript -> JavaScript, execute Tailwind,
#          and generate the optimized .next/ standalone production build.
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy node_modules from the deps stage to skip re-installing
COPY --from=deps /app/node_modules ./node_modules

# Copy the entire source code into the builder
COPY . .

# Build-time environment configurations
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compile and build the Next.js standalone bundle
RUN npm run build

# ────────────────────────────────────────────────────────────
# STAGE 3: runner (Lean Production Image)
# Purpose: Clean, minimal runtime containing only the compiled assets.
# ────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Create a dedicated non-root user/group for container execution
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy Next.js standalone build artifacts (minimizes runtime dependencies)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set safe file ownership for the non-root execution context
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose port 3000 to the Docker network
EXPOSE 3000

# Start the standalone Next.js server
CMD ["node", "server.js"]
