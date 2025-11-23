import { useState } from 'react'
import { searchUsers, fetchUserData } from '../services/githubService'

const Search = () => {
   const [location, setLocation] = useState("");
   const [loading, setLoading] = useState(false); 
   const [users, setUsers] = useState(null)  
   const [error, setError] = useState(null)
   const [userDetails, setUserDetails] = useState({}) // Store detailed user data
   const [loadingDetails, setLoadingDetails] = useState({}) // Track loading for individual users

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
    setUserDetails({}); // Clear previous details

    try {
        const data = await searchUsers(`location:${location}`)  
        setUsers(data.items)   // ✅ Store the array of users
        
        // Optionally fetch detailed data for all users immediately
        // fetchAllUserDetails(data.items);
    } catch(error) {
        setError("Failed to fetch users"); 
        console.error("failed to fetch data:", error)
    } finally {
        setLoading(false)  
    }
   }

   // Fetch detailed user data when clicking on a user card
   const fetchUserDetails = async (username) => {
     if (userDetails[username]) return; // Already fetched

     setLoadingDetails(prev => ({ ...prev, [username]: true }));
     
     try {
        const detailedData = await fetchUserData(username);
        setUserDetails(prev => ({ 
          ...prev, 
          [username]: detailedData 
        }));
     } catch (error) {
        console.error(`Failed to fetch details for ${username}:`, error);
        // You could set an error state for individual users here
     } finally {
        setLoadingDetails(prev => ({ ...prev, [username]: false }));
     }
   }

   // Optional: Fetch details for all users at once
   const fetchAllUserDetails = async (usersArray) => {
     const details = {};
     const loadingStates = {};
     
     usersArray.forEach(user => {
       loadingStates[user.login] = true;
     });
     setLoadingDetails(loadingStates);

     try {
       const promises = usersArray.map(user => 
         fetchUserData(user.login).then(data => ({ username: user.login, data }))
       );
       
       const results = await Promise.all(promises);
       
       results.forEach(({ username, data }) => {
         details[username] = data;
       });
       
       setUserDetails(details);
     } catch (error) {
       console.error("Failed to fetch user details:", error);
     } finally {
       setLoadingDetails({});
     }
   }

   // Handle user card click to fetch details
   const handleUserClick = (username) => {
     fetchUserDetails(username);
   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            GitHub User Finder
          </h1>
          <p className="text-lg text-gray-600">
            Discover GitHub users by location
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleonsubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <input
                type='text'
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                onChange={handleonchange}
                value={location}
                placeholder='Enter location (e.g., "New York", "London", "Tokyo")'
              />
            </div>
            <button
              type='submit'
              disabled={loading || !location.trim()}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                "Search Users"
              )}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Searching GitHub users in {location}...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
            <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Results */}
        {users && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Found {users.length} users in {location}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => {  
                const details = userDetails[user.login];
                const isLoading = loadingDetails[user.login];
                
                return (
                  <div 
                    key={user.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => handleUserClick(user.login)}
                  >
                    <div className="p-6">
                      {/* Avatar and Basic Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={user.avatar_url} 
                          alt={`${user.login}'s avatar`} 
                          className="w-16 h-16 rounded-full border-2 border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {user.login}
                          </h3>
                          {details && (
                            <p className="text-sm text-gray-600 truncate">
                              {details.name || 'No name available'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Detailed Information */}
                      {isLoading && (
                        <div className="flex justify-center py-2">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {details && (
                        <div className="space-y-2 mb-4">
                          {details.bio && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {details.bio}
                            </p>
                          )}
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>📊 Repos: {details.public_repos}</span>
                            <span>👥 Followers: {details.followers}</span>
                            <span>⭐ Following: {details.following}</span>
                          </div>
                          {details.blog && (
                            <p className="text-xs text-blue-600 truncate">
                              🌐 {details.blog}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Profile Link */}
                      <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500">
                  Try searching for a different location
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && !users && (
          <div className="text-center py-16">
            <div className="text-blue-400 text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              Search for GitHub Users
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a location above to discover GitHub users from that area. 
              You can search by city, country, or region.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search