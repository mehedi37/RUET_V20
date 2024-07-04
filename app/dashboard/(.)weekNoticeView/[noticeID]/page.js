import CustomModal from "@/components/modal";
import { getCTNoteInfo } from "@/lib/getCTInfo";

export default async function NoticeView({ params }) {
  const ctNote = await getCTNoteInfo(params.noticeID);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <CustomModal
          title={`${ctNote.course_code} - ${ctNote.course_name}`}
          time={ctNote.time}
          data={ctNote.note}
        />
      </div>
    </div>
  );
}
