/**
 * Environment guard — first check in the overstory guard chain.
 *
 * Replaces the POSIX shell guard: `[ -z "$OVERSTORY_AGENT_NAME" ] && exit 0;`
 *
 * On Windows, guards are chained with `&&` (run next if previous succeeds).
 * So the exit code semantics are inverted from the Unix shell version:
 *
 * - OVERSTORY_AGENT_NAME NOT set → exit(1) — stops the && chain, tool is allowed
 * - OVERSTORY_AGENT_NAME IS set → exit(0) — continues to the actual guard logic
 *
 * Cross-platform TypeScript replacement for the POSIX shell one-liner.
 * Runs under Bun.
 */

const agentName = process.env.OVERSTORY_AGENT_NAME;

if (!agentName) {
	// Not an overstory agent session — exit non-zero to stop the && chain.
	// This prevents downstream guards from blocking the tool.
	process.exit(1);
}

// Agent name is set — this IS an overstory agent session.
// Exit 0 so the && chain continues to the actual guard logic.
process.exit(0);
