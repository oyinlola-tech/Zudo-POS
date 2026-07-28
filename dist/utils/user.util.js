export function sanitizeUser(user) {
    const { passwordHash, pinHash, ...safe } = user;
    return safe;
}
//# sourceMappingURL=user.util.js.map