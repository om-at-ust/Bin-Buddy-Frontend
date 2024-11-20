export const getUserRole = async (username) => {
  try {
    const response = await fetch(`http://localhost:8081/api/auth/getRole/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user role');
    return await response.text(); // Assuming the role is returned as text
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}; 