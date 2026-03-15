export function loader() {
  // Chrome DevTools probes this path. Return 204 No Content to avoid router errors.
  return new Response(null, { status: 204 });
}

export default function WellKnown() {
  return null;
}
