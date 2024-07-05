import CustomModal from "@/components/modal";
import { getAllNoteInfo } from "@/lib/getNoticeInfo";

export default async function allNoticeView({ params }) {
  const noticeNote = await getAllNoteInfo(params.noticeID);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <CustomModal
          title={noticeNote.notice_title}
          time={noticeNote.time}
          data={noticeNote.notice}
        />
      </div>
    </div>
  );
}
