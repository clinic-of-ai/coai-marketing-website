"use client"

import type React from "react"

import { useState } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Scissors, Type, Sliders, Volume2 } from "lucide-react"

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState("upload")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      setCurrentTab("edit")
    }
  }

  return (
    <PageLayout title="Recommended" count={0}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Upload Video</h1>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="edit" disabled={!videoFile}>
              Edit
            </TabsTrigger>
            <TabsTrigger value="details" disabled={!videoFile}>
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Drag and drop video files to upload</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your videos will be private until you publish them
              </p>
              <div className="mt-6">
                <Input id="video-upload" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                <Button asChild>
                  <label htmlFor="video-upload">Select Files</label>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit" className="space-y-6">
            {videoPreview && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="rounded-lg overflow-hidden bg-black">
                      <video src={videoPreview} className="w-full aspect-video" controls />
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border">
                    <h3 className="text-lg font-medium mb-4">Editing Tools</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                        <Scissors className="h-5 w-5" />
                        <span>Trim</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                        <Type className="h-5 w-5" />
                        <span>Text</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                        <Sliders className="h-5 w-5" />
                        <span>Filters</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                        <Volume2 className="h-5 w-5" />
                        <span>Audio</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setCurrentTab("upload")}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentTab("details")}>Next</Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input id="title" placeholder="Add a title that describes your video" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea id="description" placeholder="Tell viewers about your video" rows={6} />
                </div>
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
                    Thumbnail
                  </label>
                  <Input id="thumbnail" type="file" accept="image/*" />
                </div>
                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium mb-1">
                    Visibility
                  </label>
                  <select id="visibility" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              </div>
              <div>
                {videoPreview && (
                  <div className="sticky top-4">
                    <p className="text-sm font-medium mb-2">Video Preview</p>
                    <video src={videoPreview} className="w-full rounded-lg" controls />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCurrentTab("edit")}>
                Back
              </Button>
              <Button>Publish</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

