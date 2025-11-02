import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";

interface GitHubProfile {
  name: string;
  login: string;
  avatar_url: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
  [key: string]: any;
}

const ProfileData = {
  login: "yagyaraj234",
  id: 101352591,
  node_id: "U_kgDOBgqEjw",
  avatar_url: "https://avatars.githubusercontent.com/u/101352591?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/yagyaraj234",
  html_url: "https://github.com/yagyaraj234",
  followers_url: "https://api.github.com/users/yagyaraj234/followers",
  following_url:
    "https://api.github.com/users/yagyaraj234/following{/other_user}",
  gists_url: "https://api.github.com/users/yagyaraj234/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/yagyaraj234/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/yagyaraj234/subscriptions",
  organizations_url: "https://api.github.com/users/yagyaraj234/orgs",
  repos_url: "https://api.github.com/users/yagyaraj234/repos",
  events_url: "https://api.github.com/users/yagyaraj234/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/yagyaraj234/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  name: "Yagyaraj Lodhi",
  company: null,
  blog: "https://yagyaraj.com",
  location: "Hyderabad, India",
  email: null,
  hireable: true,
  bio: "Software Engineer\r\n\r\nreach out here: hey@yagyaraj.com",
  twitter_username: null,
  public_repos: 40,
  public_gists: 0,
  followers: 13,
  following: 11,
  created_at: "2022-03-10T17:01:35Z",
  updated_at: "2025-09-19T16:23:59Z",
};
export default function UserProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function getProfile(username: string = "yagyaraj234") {
    setLoading(true);
    // const response = await axios.get(
    //   import.meta.env.VITE_GITHUB_API_URL + `/${username}`
    // );
    // setProfile(ProfileData);
    setLoading(false);
    return ProfileData;
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading || !profile ? (
        <ProfileCard.Skeleton />
      ) : (
        <ProfileCard {...profile} />
      )}
    </div>
  );
}
