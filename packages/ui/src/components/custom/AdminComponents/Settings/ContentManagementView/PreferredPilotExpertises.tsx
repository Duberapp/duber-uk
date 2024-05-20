import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '../../../../ui/card'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../../../../ui/tabs'
import TextField from '../../../TextField'
import Button from '../../../DuberButton'
import CheckCircleIcon from '../../../../../icons/CheckCircleIcon';
import { MinusCircleIcon } from 'lucide-react'
import { MediaTypes } from "global-constants";

interface OptionParams {
  title: string,
  description: string,
  tags: string[] | [],
  image: string,
  video: string
}

export default function PreferredPilotExpertises(
  { image, setImage, setVideo, video }: MediaTypes
) {
  // TODO: Fetch Data
  return (
    <div className='h-full'>
      <Tabs defaultChecked defaultValue='option-1'>
        <TabsList>
          <TabsTrigger value='option-1'>Options 1</TabsTrigger>
          <TabsTrigger value='option-2'>Options 2</TabsTrigger>
          <TabsTrigger value='option-3'>Options 3</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value='option-1'>
            <OptionLayout image={image} setImage={setImage} setVideo={setVideo} video={video} />
          </TabsContent>
          <TabsContent value='option-2'>
            <OptionLayout image={image} setImage={setImage} setVideo={setVideo} video={video} />
          </TabsContent>
          <TabsContent value='option-3'>
            <OptionLayout image={image} setImage={setImage} setVideo={setVideo} video={video} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function OptionLayout({ image, setImage, setVideo, video }: MediaTypes) {
  const [title, setTitle] = useState("Asset Management");
  const [description, setDescription] = useState("Capturing detailed photos to identify defects and issues")
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[] | []>([
    "Building & Roof Inspections",
    "Site Surveys",
    "Project Monitoring",
    "Construction Site Inspections"
  ])
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  console.log(setImage);
  console.log(setVideo);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className="w-full h-full flex gap-x-3">
      {/* Col 1 */}
      <Card className='w-96 h-full'>
        <CardContent className='py-5 flex flex-col gap-y-3'>
          <div className="">
            <p className="text-xs text-slate-500">Title</p>
            <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={false}
              className='h-12'
            />
          </div>

          <div className="">
            <p className="text-xs text-slate-500">Description</p>
            <textarea
              className='h-16 text-sm bg-duber-skyBlue-light rounded-lg outline-none w-full p-3 text-duber-skyBlue'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="">
            <p className="text-xs text-slate-500">Tags</p>

            <div className="flex items-center gap-x-2">
              <TextField placeholder='Tag Name' value={currentTag} onChange={e => setCurrentTag(e.target.value)} error={false} className='h-12 flex-1' />
              <Button variant={"pink"} size={"icon"} className='h-12 w-12'
                onClick={() => setTags(prev => [currentTag, ...prev])}
              >
                Add
              </Button>
            </div>

            <div className="mt-2 bg-duber-skyBlue-light rounded-lg flex flex-wrap gap-2 p-3">
              {tags.map((tag, index) => (
                <div className="px-2 py-1 bg-duber-skyBlue rounded-md flex items-center gap-x-1" key={index}>
                  <p className='text-xs font-medium text-white'>{tag}</p>
                  <MinusCircleIcon className='w-3 h-3 text-white cursor-pointer' />
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <p className="text-xs text-slate-500">Image</p>

            <div className="w-full h-20 bg-duber-skyBlue-light rounded-md flex items-center justify-center">
              <p className="text-duber-skyBlue font-semibold text-sm">Upload Image</p>
            </div>
          </div>

          <div className="">
            <p className="text-xs text-slate-500">Video</p>

            <div className="w-full h-20 bg-duber-skyBlue-light rounded-md flex items-center justify-center">
              <p className="text-duber-skyBlue font-semibold text-sm">Upload Video</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Col 2 */}
      <Card className='flex-1 bg-slate-100 min-h-full'>
        <CardContent className='py-3 h-full flex flex-col'>
          <p className="font-semibold text-sm">Preview</p>

          <div className="flex-1 flex items-center justify-center w-full">
            <Card
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-80 p-3 rounded-lg bg-duber-skyBlue-light cursor-pointer"
              onClick={() => setIsSelected(!isSelected)}
            >

              <div className="mb-3">
                {image && !video && (
                  <img
                    className='w-full h-full'
                    src={typeof image === 'string' ? image : ""}
                  />
                )}

                {video && !image && (
                  <video className='w-full min-h-32 rounded-xl' ref={videoRef} autoPlay={isHovered} loop muted >
                    <source
                      src={typeof video === 'string' ? video : ""}
                      type='video/mp4'
                    />
                  </video>
                )}
              </div>

              <h2 className='text-base text-duber-skyBlue font-semibold'>{title}</h2>
              <p className="text-sm text-duber-skyBlue">{description}</p>

              <div className="flex items-end gap-x-1">

                <div className="flex-1 flex gap-2 flex-wrap mt-3">{tags.map((tag, index) => (
                  <p key={index} className='px-2 py-1 bg-duber-skyBlue rounded-md text-xs text-white'>
                    {tag}
                  </p>
                ))}</div>

                {isSelected ?
                  <CheckCircleIcon className={`w-6 h-6 text-duber-teal-dark`} />
                  :
                  <CheckCircleIcon className={`w-6 h-6 text-gray-400 opacity-60`} />
                }
              </div>
            </Card>
          </div>

          <div className="w-full flex justify-end">
            <Button variant={'skyBlue'}>Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}