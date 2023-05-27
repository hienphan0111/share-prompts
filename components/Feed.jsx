'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const fetchPost = async () => {
    const res = await fetch(`api/users/${session?.user.id}/posts`);
    
    const data = await res.json();
    console.log(data);
    setPosts(data);
  }

  useEffect(() => {
    if (session?.user.id) fetchPost();
  }, []);

  return (
    <section class="feed">
      <form className="realative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a usename"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed;
