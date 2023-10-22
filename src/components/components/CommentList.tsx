import { Comment } from "@/components/components/Comment";
import { useComments } from "@/server-cache/useDealComments";

interface Props {
  dealId: string;
  organizationId: string;
}

export function CommentList(props: Props) {
  const { dealId, organizationId } = props;

  const commentsQuery = useComments({ dealId, organizationId });
  if (commentsQuery.isPending) {
    return "Loading";
  }
  if (commentsQuery.isError) {
    return commentsQuery.error.message;
  }

  if (commentsQuery.data.length === 0) {
    return <div>Add your first comment</div>;
  }

  return commentsQuery.data.map((comment) => {
    return (
      <Comment
        key={comment.id}
        avatar={comment.user?.imageUrl ?? "Unknown"}
        text={comment.text}
        date={comment.timestamp}
        username={
          comment.user == null
            ? "Unknown"
            : comment.user.username ??
              `${comment.user.firstName} ${comment.user.lastName}`
        }
      />
    );
  });
}
