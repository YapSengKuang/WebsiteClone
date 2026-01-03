"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function CreateBaseButton() {
  const router = useRouter();
  const utils = api.useUtils();

  const createBase = api.base.createBase.useMutation({
    onSuccess: (newBase) => {
      utils.base.getAll.invalidate();
      router.push(`/base/${newBase.id}`);
    },
  });

  const handleClick = () => {
    createBase.mutate({ name: "Untitled Base" });
  };

  return (
    <button
      onClick={handleClick}
      className="border rounded-lg p-4 bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      + Create Base
    </button>
  );
}
