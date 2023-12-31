import { Card, CardTitle, CardDescription, CardContent } from '../../ui/card'

interface InitialSidebarProps {
  img_1: string,
  img_2: string,
  title: string,
  description: string
}

export function InitialSidebar({ img_1, img_2, title, description }: InitialSidebarProps) {
  return (
    <Card className={`relative h-full bg-duber-navyBlue overflow-hidden flex items-center justify-center`}>
      <CardContent className='flex items-center flex-col justify-center mx-9'>
        <CardTitle className='text-2xl text-white text-center'>{title}</CardTitle>
        <CardDescription className='text-sm mt-1 text-gray-50 font-light text-center'>{description}</CardDescription>
      </CardContent>

      <img src={img_1} alt='halo-1' className='absolute top-0 right-0' />
      <img src={img_2} alt='halo-2' className='absolute bottom-0 left-0' />
    </Card>
  )
}