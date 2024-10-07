import AddNoticeModal from "@/components/addNoticeModal/addNoticeModal";

export default async function addNoticeView() {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <AddNoticeModal
          title={"Test Notice | Test Creator"}
          time={"2022-01-01"}
          data={"Test Notice Data"}
        />
      </div>
    </div>
  );
}
