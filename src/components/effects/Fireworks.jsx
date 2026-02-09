import { useEffect } from "react";
import { FIREWORKS } from "../../data/constants";
import useFireworkSounds from "../../hooks/useFireworkSounds";

export default function Fireworks() {
  const { playLaunch, playBurst } = useFireworkSounds();

  useEffect(() => {
    FIREWORKS.forEach((fw) => {
      playLaunch(fw.delay);
      playBurst(fw.delay + 0.6);
    });
  }, [playLaunch, playBurst]);

  return (
    <div className="fireworks-container">
      {FIREWORKS.map((fw) => (
        <div key={fw.id} className="firework" style={{ left: `${fw.x}%`, "--burst-y": `${fw.burstY}vh` }}>
          <div className="firework-trail" style={{ animationDelay: `${fw.delay}s` }} />
          <div className="firework-burst" style={{ animationDelay: `${fw.delay + 0.6}s` }}>
            {fw.sparks.map((sp) => (
              <div
                key={sp.id}
                className="spark"
                style={{
                  "--spark-angle": `${sp.angle}deg`,
                  "--spark-dist": `${sp.distance}px`,
                  "--spark-color": sp.color,
                  "--spark-size": `${sp.size}px`,
                  "--trail-len": `${sp.trailLength}px`,
                  animationDuration: `${sp.duration}s`,
                  animationDelay: `${fw.delay + 0.6}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
