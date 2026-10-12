export function canAccessAdmin(user) {
  const role = user?.role ?? user?.roles;
  if (role == null) return true; // backend doesn't send roles yet
  return [].concat(role).some((r) => String(r).toUpperCase() === "ADMIN");
}
