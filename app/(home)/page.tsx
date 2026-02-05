import Link from "next/link";
import LightPillar from "@/components/light-pillar";
import { Button } from "@/components/ui/warcraftcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/warcraftcn/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 pb-3">
      <div className="absolute top-0 left-0 h-full w-full">
        <LightPillar
          bottomColor="#52d6fc"
          glowAmount={0.004}
          intensity={1}
          interactive={false}
          noiseIntensity={0.5}
          pillarHeight={0.4}
          pillarRotation={0}
          pillarWidth={3}
          rotationSpeed={0.3}
          topColor="#ffab01"
        />
      </div>
      <Card className="relative z-10">
        <CardHeader className="text-white">
          <CardTitle className="text-center font-bold text-2xl">
            warcraftcn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">
            A set of components inspired by classic Warcraft III RTS UI
            aesthetics. Open source, copy paste ready. Works with your favorite
            frameworks. Fan made. No affiliation.
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Link href="/docs">
            <Button className="text-xl" size="sm">
              Get Started
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
