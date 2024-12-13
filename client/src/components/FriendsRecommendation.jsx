import { useState, useEffect } from 'react'; // Import hooks for managing state and lifecycle events
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components for creating a carousel
import 'swiper/css'; // Import basic Swiper styles
import 'swiper/css/navigation'; // Import navigation styles for Swiper
import { Navigation } from 'swiper/modules'; // Import the navigation module for Swiper
import axios from 'axios'; // Import Axios for making HTTP requests

// Component: Displays recommended friends with infinite loading
const FriendsRecommendation = () => {
  const pageSize = 12; // Number of users to load in each batch
  const [displayedUsers, setDisplayedUsers] = useState([]); // State to store the users displayed on the screen
  const [loading, setLoading] = useState(false); // State to track if users are currently being fetched
  const [hasMore, setHasMore] = useState(true); // State to check if more users are available to load
  const [lastId, setLastId] = useState(null); // Tracks the last loaded user's ID for pagination

  // Function to fetch users from the backend
  const loadMoreUsers = async () => {
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more users to load
    
    setLoading(true); // Set loading state to true to indicate data is being fetched
    try {
      // Make a GET request to fetch users from the backend with pagination
      const { data } = await axios.get('/api/users', {
        params: {
          pageSize, // How many users to fetch in this request
          lastId: lastId || '', // Pass the last user's ID or empty if first batch
        },
      });

      const newUsers = data.users; // Extract the new users from the response
      setDisplayedUsers((prev) => [...prev, ...newUsers]); // Add new users to the existing list
      setHasMore(data.hasMore); // Update if there are more users to load
      setLastId(data.lastId); // Update the last user's ID for the next request
    } catch (error) {
      console.error('Failed to fetch users:', error); // Log any errors to the console
    } finally {
      setLoading(false); // Reset loading state to false after the request is complete
    }
  };

  // Load the first batch of users when the component is rendered
  useEffect(() => {
    loadMoreUsers(); // Call loadMoreUsers once when the component mounts
  }, []); // Empty dependency array ensures this runs only on mount

  // Return the JSX for rendering the component
  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      {/* Outer container with centered content */}
      <div className="max-w-5xl w-full">
        {/* Swiper: Carousel for displaying users */}
        <Swiper
          modules={[Navigation]} // Enable navigation for Swiper
          spaceBetween={20} // Space between slides
          slidesPerView={3} // Number of slides visible at once
          navigation // Enable navigation arrows
          onReachEnd={() => {
            if (hasMore) {
              loadMoreUsers(); // Load more users when the user scrolls to the end
            }
          }}
          breakpoints={{
            // Configure the number of slides based on screen width
            640: { slidesPerView: 2 }, // 2 slides on smaller screens
            768: { slidesPerView: 3 }, // 3 slides on medium screens
            1024: { slidesPerView: 4 }, // 4 slides on larger screens
          }}
          className="w-full"
        >
          {/* Map through the displayedUsers array to create slides */}
          {displayedUsers.map((user) => (
            <SwiperSlide key={user.id}>
              {/* Each user's card */}
              <div
                className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
                onClick={() => console.log('cardClicked')} // Log a message when the card is clicked
              >
                <div className="flex justify-center items-center">
                  <img
                    src={user.profilePic} // Display user's profile picture
                    alt={`${user.name} Profile`} // Provide alternate text
                    className="w-20 h-20 rounded-full mx-auto mb-3" // Style the image
                  />
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3> {/* Display user's name */}
                </div>
                <p className="text-sm mb-4 text-green-600 font-semibold">
                  Friends: {user.friends} {/* Display user's number of friends */}
                </p>
                <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
                  <span className="text-xl mr-1">+</span> Add Friend {/* Add Friend button */}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {loading && <p className="text-center mt-4">Loading...</p>} {/* Show "Loading..." when data is being fetched */}
        {!hasMore && <p className="text-center mt-4">No more users to load</p>} {/* Show message when no more users */}
      </div>
    </div>
  );
};

export default FriendsRecommendation; // Export the component for use in other parts of the app
