'use client';
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import UpdateForm from "./UpdateForm";
import { useRef } from "react";
import $ from 'jquery'
import { translate } from "@/lib/funcs/translate";
import dynamic from "next/dynamic";
const ConvertToLocalDate = dynamic(() => import('@/lib/funcs/date'), {ssr: false});

export default function Comment({ authorize, comment, lang }) {
    const updateForm = useRef();
    function showUpdateForm() {
        const updateFormEle = updateForm.current;
        $(updateFormEle).toggle(0)
    }
    const translates = translate(lang);
    
    return (
        <div className="bg-gray-200 border border-sky-400 dark:bg-dark">
            {comment ?
                <>
                    <div className="flex justify-between items-center p-1">
                        <div className="flex items-center gap-1">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${comment.user.img_path}`}
                                alt="Profile Image"
                                width={100}
                                height={100}
                                className="rounded-full object-cover w-12 h-12"
                            />
                            <div className="flex flex-col">
                                <Link href={`/profile/${comment.user.id}`}>{comment.user.name}</Link>
                                <b>
                                    <ConvertToLocalDate date={comment.created_at} lang={lang} />
                                </b>
                            </div>
                        </div>
                        {authorize ?
                            <div className="relative group/edit-comment">
                                <div className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full transition group-hover/edit-comment:bg-sky-400 group-hover/edit-comment:text-white">
                                    <i className="fa fa-ellipsis-v"></i>
                                </div>
                                <div className="border border-sky-400 rounded-md flex flex-col opacity-0 overflow-hidden absolute top-full -z-30 transition-opacity bg-white dark:bg-dark group-hover/edit-comment:opacity-100 group-hover/edit-comment:z-30">
                                    <DeleteBtn lang={lang} commentId={comment.id} />
                                    <button className={'hover:bg-sky-400 p-2 hover:text-white'} onClick={showUpdateForm}>{translates.update}</button>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                    <hr className="border-sky-400" />
                    <div className="p-1">{comment.body}</div>
                    {authorize ?
                        <UpdateForm comment={comment} refrence={updateForm} />
                        :
                        null
                    }
                </>
                :
                <h1 className="text-red-500 text-2xl">{translates.comment404}</h1>
            }
        </div>
    )
}
