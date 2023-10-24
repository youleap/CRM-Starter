import Image from "next/image";

interface Props {
  username: string;
  text: string;
  avatar: string;
  date: string;
}

export function Comment(props: Props) {
  const { date, username, text, avatar } = props;
  return (
    <div className="flex items-start space-y-2">
      <Image
        alt="Avatar"
        className="rounded-full"
        height="32"
        src={avatar}
        style={{
          aspectRatio: "32/32",
          objectFit: "cover",
        }}
        width="32"
      />
      <div className="ml-4">
        <div className="font-semibold">{username}</div>
        <p className="text-zinc-600 dark:text-zinc-300">{text}</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">{date}</p>
      </div>
    </div>
  );
}
