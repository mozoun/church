-- Create admin user for Rivers of Living Waters Ministry
-- Run this in Railway Dashboard > PostgreSQL > Query tab

INSERT INTO admins (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@riversoflivingwaterchurch.org',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYPNXxHxIYe',
  'Admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Login credentials:
-- Email: admin@riversoflivingwaterchurch.org
-- Password: Admin123!
