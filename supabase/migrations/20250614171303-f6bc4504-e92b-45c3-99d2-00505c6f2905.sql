
-- Update the user role to admin for sstonelabs@gmail.com
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'sstonelabs@gmail.com'
);
