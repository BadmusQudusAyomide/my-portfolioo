import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, slug } = body

    // Only revalidate for project updates
    if (_type !== 'project') {
      return NextResponse.json({ message: 'Not a project update' }, { status: 200 })
    }

    // Revalidate the projects index page
    revalidatePath('/projects')
    
    // Revalidate the specific project page if slug exists
    if (slug?.current) {
      revalidatePath(`/projects/${slug.current}`)
    }

    // Revalidate the home page projects section
    revalidatePath('/')

    console.log(`Revalidated paths for project: ${slug?.current || 'unknown'}`)

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
