SELECT organizations.name as organization, roles.name as role, users.name as name, email, master_password, master_password_hint, is_active
FROM users
JOIN organizations ON organizations.id = organization_id
JOIN roles ON roles.id = role_id
WHERE organizations.id = 1
ORDER BY organization;
