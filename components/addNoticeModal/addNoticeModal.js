"use client";
import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

import ModalTabs from "@/components/addNoticeModal/modalTabs";

const noticeConfigs = {
  ctNotice: {
    fields: [
      { name: "course_id", label: "Course ID", type: "number", required: true },
      { name: "section", label: "Section", type: "text", required: true },
      {
        name: "department",
        label: "Department",
        type: "number",
        required: true,
      },
      { name: "CT Date", label: "Time", type: "date", required: true },
      { name: "note", label: "Note", type: "textarea", required: true },
    ],
    handleSubmit: (event) => {
      event.preventDefault();
      const noticeData = {
        course_id: event.target.course_id.value,
        section: event.target.section.value,
        department: event.target.department.value,
        time: event.target.time.value,
        note: event.target.note.value,
      };
      // Add logic to save CT notice to the database
      console.log("CT Notice:", noticeData);
    },
  },
  studentNotice: {
    fields: [
      {
        name: "notice_creator",
        label: "Notice Creator",
        type: "text",
        required: true,
      },
      {
        name: "notice_title",
        label: "Notice Title",
        type: "text",
        required: true,
      },
      { name: "notice", label: "Notice", type: "textarea", required: true },
      { name: "time", label: "Time", type: "date", required: true },
      { name: "series", label: "Series", type: "number", required: true },
      { name: "section", label: "Section", type: "text", required: true },
      {
        name: "department",
        label: "Department",
        type: "number",
        required: true,
      },
    ],
    handleSubmit: (event) => {
      event.preventDefault();
      const noticeData = {
        notice_creator: event.target.notice_creator.value,
        notice_title: event.target.notice_title.value,
        notice: event.target.notice.value,
        time: event.target.time.value,
        series: event.target.series.value,
        section: event.target.section.value,
        department: event.target.department.value,
      };
      // Add logic to save student notice to the database
      console.log("Student Notice:", noticeData);
    },
  },
  teachersNotice: {
    fields: [
      {
        name: "notice_creator",
        label: "Notice Creator",
        type: "text",
        required: true,
      },
      {
        name: "department",
        label: "Department",
        type: "number",
        required: true,
      },
      { name: "time", label: "Time", type: "date", required: true },
      {
        name: "notice_title",
        label: "Notice Title",
        type: "text",
        required: true,
      },
      { name: "notice", label: "Notice", type: "textarea", required: true },
    ],
    handleSubmit: (event) => {
      event.preventDefault();
      const noticeData = {
        notice_creator: event.target.notice_creator.value,
        department: event.target.department.value,
        time: event.target.time.value,
        notice_title: event.target.notice_title.value,
        notice: event.target.notice.value,
      };
      // Add logic to save teachers notice to the database
      console.log("Teachers Notice:", noticeData);
    },
  },
};

export default function AddNoticeModal({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 items-center">
          <p className="text-sky-500">{title}</p>
        </ModalHeader>
        <ModalBody>
          <ModalTabs noticeConfigs={noticeConfigs} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
