SELECT credentials.id as id, users.is_active as is_active, organizations.name as organization, roles.name as role_name, users.name as name, users.email as email, website, username, password, hint, category, require_master_password
FROM credentials
JOIN users ON users.id = credentials.user_id
JOIN organizations ON organizations.id = credentials.organization_id
JOIN roles ON roles.id = credentials.role_id;
