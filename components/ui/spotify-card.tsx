import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@iconify-icon/react";

interface TrackAdCardProps {
  imageUrl?: string;
  trackName?: string;
  artistName?: string;
  appleMusicUrl?: string;
  spotifyMusicUrl?: string;
  youtubeUrl?: string;
  otherPlatformUrl?: string;
}

export default function Component({
  imageUrl = "https://i.scdn.co/image/ab67616d0000b27399242a06b830dd51400e9b63",
  trackName = "Vidas",
  artistName = "Kelvyn Santana",
  spotifyMusicUrl = "https://open.spotify.com/track/0SYpABsLAUjbz4WlR3SKJe?si=98933b0812474276",
  appleMusicUrl = "https://music.apple.com/us/album/vidas/1772218264?i=1772218274",
  youtubeUrl = "https://www.youtube.com/watch?v=m7Rert3ypHs",
  otherPlatformUrl = "https://deezer.page.link/xu6GmpQrSzeVxJpz7",
}: TrackAdCardProps) {
  return (
    <Card className="max-w-xs bg-white border border-gray-200 shadow-sm">
      <div className="relative">
        <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold text-white bg-gray-800 rounded">
          Ad
        </div>
      </div>
      <img
        src={imageUrl}
        alt={`${trackName} by ${artistName}`}
        className="w-full h-40 object-none"
      />
      <CardContent className="p-3 text-center">
        <h3 className="text-lg font-semibold">{trackName}</h3>
        <p className="text-sm text-gray-500">{artistName}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-3 p-3">
        <Button variant="ghost" size="sm" asChild>
          <a href={spotifyMusicUrl} target="_blank" rel="noopener noreferrer">
            <Icon
              icon="fontisto:spotify"
              height={20}
              width={20}
              className="hover:text-[#1DB954]"
            />
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={appleMusicUrl} target="_blank" rel="noopener noreferrer">
            <Icon
              icon="fontisto:apple-music"
              className="hover:text-[#fc3c44]"
              height={20}
              width={20}
            />
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <Icon
              icon="mdi:youtube"
              className="hover:text-red-500"
              height={20}
              width={20}
            />
          </a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={otherPlatformUrl} target="_blank" rel="noopener noreferrer">
            <Icon
              icon="material-symbols:globe"
              className="hover:text-purple-400"
              height={20}
              width={20}
            />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
