import connection from '../../lib/mongodb';
import Video from '../../models/videos';
import { NextResponse } from 'next/server';


export  async function GET() {

    await connection();

    try {
      const videos = await Video.find();
      if (!videos) {
        console.error('No videos found');
        return NextResponse.json({ error: 'No videos found' });
      }
      console.log('Videos fetched successfully:', videos);
      return NextResponse.json(videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      return NextResponse.json({ error: 'Failed to fetch videos' });
    }

   
  
}
