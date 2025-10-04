type ProfileCardProps = {
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

export default function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="flex flex-col  gap-4 items-center justify-center w-9/12 h-full">
      <div className="flex items-center justify-center">
        <div className="flex  gap-4 items-start">
          <img
            src={props.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full"
          />

          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div className="text-2xl font-bold">{props.name}</div>
            <div className=" text-start">{props.bio}</div>
            <div className="flex  gap-x-4 items-center">
              <div className="flex flex-col gap-0.5 items-center">
                <div>Public Repos</div>

                <div className="text-lg text-gray-500">
                  <span className="text-lg font-bold">
                    {props.public_repos}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 items-center">
                <div>Followers</div>
                <div className=" text-gray-500 text-lg font-bold">
                  {props.followers}
                </div>
              </div>
              <div className="flex flex-col gap-0.5 items-center">
                <div>Following</div>
                <div className=" text-gray-500 text-lg font-bold">
                  {props.following}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileCard.Skeleton = function ProfileCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-9/12 h-full">
      <div className="flex items-center justify-center">
        <div className="flex  gap-4 items-start">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
