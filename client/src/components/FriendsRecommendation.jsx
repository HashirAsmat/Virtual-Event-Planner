// import { useState, useEffect } from 'react'; // Import hooks for managing state and lifecycle events
// import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components for creating a carousel
// import 'swiper/css'; // Import basic Swiper styles
// import 'swiper/css/navigation'; // Import navigation styles for Swiper
// import { Navigation } from 'swiper/modules'; // Import the navigation module for Swiper
// import axios from 'axios'; // Import Axios for making HTTP requests

// // Component: Displays recommended friends with infinite loading
// const FriendsRecommendation = () => {
//   const pageSize = 12; // Number of users to load in each batch
//   const [displayedUsers, setDisplayedUsers] = useState([]); // State to store the users displayed on the screen
//   const [loading, setLoading] = useState(false); // State to track if users are currently being fetched
//   const [hasMore, setHasMore] = useState(true); // State to check if more users are available to load
//   const [lastId, setLastId] = useState(null); // Tracks the last loaded user's ID for pagination
//   // Function to fetch users from the backend
//   const loadMoreUsers = async () => {
//     if (loading || !hasMore) return; // Prevent fetching if already loading or no more users to load
    
//     setLoading(true); // Set loading state to true to indicate data is being fetched
//     try {
//       // Make a GET request to fetch users from the backend with pagination
//       const { data } = await axios.get('/api/users', {
//         params: {
//           pageSize, // How many users to fetch in this request
//           lastId: lastId || '', // Pass the last user's ID or empty if first batch
//         },
//       });

//       const newUsers = data.users; // Extract the new users from the response
//       setDisplayedUsers((prev) => [...prev, ...newUsers]); // Add new users to the existing list
//       setHasMore(data.hasMore); // Update if there are more users to load
//       setLastId(data.lastId); // Update the last user's ID for the next request
//     } catch (error) {
//       console.error('Failed to fetch users:', error); // Log any errors to the console
//     } finally {
//       setLoading(false); // Reset loading state to false after the request is complete
//     }
//   };

//   // Load the first batch of users when the component is rendered
//   useEffect(() => {
//     loadMoreUsers(); // Call loadMoreUsers once when the component mounts
//   }, []); // Empty dependency array ensures this runs only on mount

//   // Return the JSX for rendering the component
//   return (
//     <div className="flex justify-center items-center p-5 bg-gray-100">
//       {/* Outer container with centered content */}
//       <div className="max-w-5xl w-full">
//         {/* Swiper: Carousel for displaying users */}
//         <Swiper
//           modules={[Navigation]} // Enable navigation for Swiper
//           spaceBetween={20} // Space between slides
//           slidesPerView={3} // Number of slides visible at once
//           navigation // Enable navigation arrows
//           onReachEnd={() => {
//             if (hasMore) {
//               loadMoreUsers(); // Load more users when the user scrolls to the end
//             }
//           }}
//           breakpoints={{
//             // Configure the number of slides based on screen width
//             640: { slidesPerView: 2 }, // 2 slides on smaller screens
//             768: { slidesPerView: 3 }, // 3 slides on medium screens
//             1024: { slidesPerView: 4 }, // 4 slides on larger screens
//           }}
//           className="w-full"
//         >
//           {/* Map through the displayedUsers array to create slides */}
//           {displayedUsers.map((user) => (
//             <SwiperSlide key={user.id}>
//               {/* Each user's card */}
//               <div
//                 className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
//                 onClick={() => console.log('cardClicked')} // Log a message when the card is clicked
//               >
//                 <div className="flex justify-center items-center">
//                   <img
//                     src={user.profilePic} // Display user's profile picture
//                     alt={`${user.name} Profile`} // Provide alternate text
//                     className="w-20 h-20 rounded-full mx-auto mb-3" // Style the image
//                   />
//                   <h3 className="text-lg font-semibold mb-2">{user.name}</h3> {/* Display user's name */}
//                 </div>
//                 <p className="text-sm mb-4 text-green-600 font-semibold">
//                   Friends: {user.friends} {/* Display user's number of friends */}
//                 </p>
//                 <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
//                   <span className="text-xl mr-1">+</span> Add Friend {/* Add Friend button */}
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {loading && <p className="text-center mt-4">Loading...</p>} {/* Show "Loading..." when data is being fetched */}
//         {!hasMore && <p className="text-center mt-4">No more users to load</p>} {/* Show message when no more users */}
//       </div>
//     </div>
//   );
// };

// export default FriendsRecommendation; // Export the component for use in other parts of the app




import { useState, useEffect, useCallback } from 'react'; // Import React and required hooks
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components for carousel functionality
import 'swiper/css'; // Import basic Swiper styles
import 'swiper/css/navigation'; // Import Swiper navigation styles
import { Navigation } from 'swiper/modules'; // Import Swiper navigation module
import axios from 'axios'; // Import Axios for making API requests

// UserCard component to display individual user details
const UserCard = ({ user, onClick }) => (
  <div
    className="bg-white border border-gray-200 rounded-sm shadow-md p-5 w-52 text-center transform transition-transform hover:-translate-y-1 cursor-pointer"
    onClick={onClick} // Handle click event on the user card
  >
    <div className="flex justify-center items-center">
      {/* Display the user's profile picture */}
      <img
        src={user.profilePic}
        alt={`${user.name} Profile`} // Provide an alternative text for the image
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      {/* Display the user's name */}
      <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
    </div>
    {/* Display the user's friends count */}
    <p className="text-sm mb-4 text-green-600 font-semibold">
      Friends: {user.friends}
    </p>
    {/* Add Friend button */}
    <button className="bg-[#272727] text-white px-4 py-1 rounded-md hover:bg-[#0a0a0a]">
      <span className="text-xl mr-1">+</span> Add Friend
    </button>
  </div>
);

// Main component to handle the friends recommendation feature
const FriendsRecommendation = () => {
  const pageSize = 12; // Define the number of users to fetch per API request

  // State to manage the list of displayed users
  const [displayedUsers, setDisplayedUsers] = useState(() => {
    const savedUsers = localStorage.getItem('displayedUsers'); // Retrieve previously saved users from localStorage
    return savedUsers ? JSON.parse(savedUsers) : []; // Parse the saved data or initialize with an empty array
  });

  const [loading, setLoading] = useState(false); // State to manage loading status
  const [hasMore, setHasMore] = useState(true); // State to track if there are more users to load
  const [lastId, setLastId] = useState(localStorage.getItem('lastId') || null); // Retrieve the last fetched user ID from localStorage

  // Function to load more users from the server
  const loadMoreUsers = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent fetching if already loading or no more users are available

    setLoading(true); // Set loading state to true to indicate a fetch is in progress
    try {
      const { data } = await axios.get('/api/users', {
        // Make a GET request to fetch users
        params: {
          pageSize, // Number of users to fetch per request
          lastId: lastId || '', // Provide the last user's ID for pagination
        },
      });

      const newUsers = data.users; // Extract the list of users from the response

      // Update the displayed users state
      setDisplayedUsers((prev) => {
        const updatedUsers = [...prev, ...newUsers]; // Append new users to the existing list
        localStorage.setItem('displayedUsers', JSON.stringify(updatedUsers)); // Save updated list to localStorage
        return updatedUsers; // Update the state with the new list
      });

      setHasMore(data.hasMore); // Update the `hasMore` flag based on the server response
      setLastId(data.lastId); // Update the `lastId` with the latest user's ID
      localStorage.setItem('lastId', data.lastId); // Save the `lastId` to localStorage for persistence
    } catch (error) {
      console.error('Failed to fetch users:', error); // Log any errors during the fetch
    } finally {
      setLoading(false); // Reset loading state
    }
  }, [loading, hasMore, pageSize, lastId]); // Dependencies for the useCallback hook

  // Fetch initial users when the component mounts
  useEffect(() => {
    if (!displayedUsers.length) {
      // Only load users if no users are already loaded
      loadMoreUsers();
    }
  }, [loadMoreUsers, displayedUsers]); // Dependencies for the useEffect hook

  return (
    <div className="flex justify-center items-center p-5 bg-gray-100">
      <div className="max-w-5xl w-full">
        {/* Swiper carousel to display user cards */}
        <Swiper
          modules={[Navigation]} // Include Swiper navigation module
          spaceBetween={20} // Space between each slide
          slidesPerView={3} // Default number of slides visible
          navigation // Enable navigation arrows
          onReachEnd={() => {
            if (hasMore) loadMoreUsers(); // Load more users when the carousel reaches the end
          }}
          breakpoints={{
            640: { slidesPerView: 2 }, // Show 2 slides on smaller screens
            768: { slidesPerView: 3 }, // Show 3 slides on medium screens
            1024: { slidesPerView: 4 }, // Show 4 slides on large screens
          }}
          className="w-full"
        >
          {/* Map through the list of displayed users and render each UserCard */}
          {displayedUsers.map((user) => (
            <SwiperSlide key={user.id}>
              <UserCard
                user={user}
                onClick={() => console.log(`${user.name}'s card clicked`)} // Handle card click event
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Show loading message while fetching data */}
        {loading && <p className="text-center mt-4">Loading...</p>}

        {/* Show message when no more users are left to load */}
        {!hasMore && <p className="text-center mt-4">No more users to load</p>}
      </div>
    </div>
  );
};

export default FriendsRecommendation; // Export the main component
