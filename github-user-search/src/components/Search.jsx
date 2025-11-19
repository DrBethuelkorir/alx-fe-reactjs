import {useState } from 'react'
import { searchUsers } from '../services/githubService'

const Search = () => {
   const [location, setLocation] = useState("");
   const [loading, setLoading] = useState(false); 
   const [users, setUsers] = useState(null)  
   const [error, setError] = useState(null)

   const handleonchange = (e) =>{
    setLocation(e.target.value);  
    setError(null);  
   }

   const handleonsubmit = async (e) =>{
    e.preventDefault();
    if(!location.trim()) return

    setLoading(true);        
    setError(null);
    setUsers(null);

    try {
        const data = await searchUsers(`location:${location}`)  
        setUsers(data.items)   // ✅ Store the array of users
    } catch(error) {
        setError("Failed to fetch users"); 
        console.error("failed to fetch data:", error)
    } finally {
        setLoading(false)  
    }
   }

  return (
    <div>
        <form onSubmit={handleonsubmit}>
            <input
                type='text'
                className='locationinput'
                onChange={handleonchange}
                value={location}
                placeholder='Enter Location of User'
            />
            <button
                type='submit'
                disabled= {loading || !location.trim()}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>

        {loading && <div>Loading.....</div>}

        {error && <div className="error">{error}</div>}  {/* ✅ Fixed */}

        {users && users.map(user => (  
            <div key={user.id} className="user-card">
                <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`} 
                    className="avatar"
                />
                <div className="user-info">
                    <h2 className="user-name">
                        {user.login}  {/* search API doesn't return 'name' */}
                    </h2>
                    <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="profile-link"
                    >
                        View GitHub Profile
                    </a>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Search