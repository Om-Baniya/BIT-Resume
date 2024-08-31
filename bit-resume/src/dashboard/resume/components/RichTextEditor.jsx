import React, { useContext } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  HtmlButton,
  BtnStyles,
} from "react-simple-wysiwyg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIchatSession } from "./../../../../service/AIModel";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const PROMPT='position title: {positionTitle} , Depends on position title give me 3-4 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags and please dont include the position title in the content you will give me , only give me bullet points not other things, don'

function RichTextEditor({ onRichTextEditorChange, index ,defaultValue}) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    
    if (!resumeInfo.Experience[index]?.title) {
      toast("Please add position title");
      return;
    }

    setLoading(true);


    const prompt = PROMPT.replace(
      '{positionTitle}',
      resumeInfo.Experience[index].title
    );


    const result = await AIchatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace('[','').replace(']','').replace('{','').replace('}',''));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs"> Summery </label>

        <Button
          onClick={GenerateSummeryFromAI}
          variant=" outline "
          size="sm"
          disabled={loading}
          className="flex gap-2 border border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin"/>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate From Ai
            </>
          )}
        </Button>
      </div>


      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
