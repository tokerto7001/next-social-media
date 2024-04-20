"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { Topic } from '@prisma/client';
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lower case letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface ICreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[]; // this field is added just because if there is an issue about the form itself or its general stuff
    }
}

export async function createTopic(formState: ICreateTopicFormState, formData: FormData): Promise<ICreateTopicFormState>{

  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description")
  });

 
  if(!result.success) {
    return {
        errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if(!session?.user) return {
    errors: {
      _form: ['You must be signed in to do this.']
    }
  }

  let topic: Topic;
  try{
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    })
  }catch(err: unknown){
    if(err instanceof Error){
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong!']
        }
      }
    }

  }

  revalidatePath('/');
  redirect(paths.showTopic(topic.slug));

}
