import React from 'react'
import { Card, CardContent } from '../../../../ui/card'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../../../../ui/tabs'
import PreferredPilotExpertises from './PreferredPilotExpertises'
import Subscriptions from './Subscriptions'
import { MediaTypes } from "global-constants";

type Props = {
  pilotExpertiseProps: {
    optionsMedia: MediaTypes
  }
}

export default function ContentManagementView({ pilotExpertiseProps }: Props) {
  return (
    <Card className='py-5'>
      <CardContent>
        <Tabs defaultValue='preferred-pilot-expertises' defaultChecked>
          <TabsList >
            <TabsTrigger value='preferred-pilot-expertises'>
              Preferred Pilot Expertises
            </TabsTrigger>
            <TabsTrigger value='subscriptions'>
              Subscriptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value='preferred-pilot-expertises'>
            <PreferredPilotExpertises
              image={pilotExpertiseProps.optionsMedia.image}
              setImage={pilotExpertiseProps.optionsMedia.setImage}
              video={pilotExpertiseProps.optionsMedia.video}
              setVideo={pilotExpertiseProps.optionsMedia.setVideo}
            />
          </TabsContent>
          <TabsContent value='subscriptions'>
            <Subscriptions />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}