import Image from "next/image";
import type { Project } from "@/lib/content";

export function SymbolHeader({
  project,
  linked = false,
}: {
  project: Project;
  linked?: boolean;
}) {
  const Heading = linked ? "h3" : "h2";
  return (
    <div className="symbol-header bus-node">
      <span className="symbol-pin pin-left">
        <span className="pin-label">{project.pins[0]}</span>
        <span className="pin-stub" aria-hidden="true" />
      </span>
      <div className="symbol-body">
        <span className="refdes">{project.ref}</span>
        <Heading>{project.title}</Heading>
        <span className="symbol-value">{project.value}</span>
      </div>
      <span className="symbol-pin pin-right">
        <span className="pin-stub" aria-hidden="true" />
        <span className="pin-label">{project.pins[1]}</span>
      </span>
    </div>
  );
}
export function ProjectMedia({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (project.image)
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes="(max-width: 767px) 90vw, (max-width: 1199px) 80vw, 1100px"
        priority={priority}
        className="project-image"
      />
    );
  if (!project.diagram) return null;
  const buck = project.diagram === "buck";
  return (
    <figure className="schematic-figure">
      <div
        className="functional-diagram"
        role="img"
        aria-label={
          buck
            ? "TPS2832 gate driver connected to two power MOSFETs, with op-amp current sensing on a 0.5 ohm shunt."
            : "BNC input connected to a TLV2372 op-amp, with potentiometer gain control."
        }
      >
        <div className="diagram-block">
          {buck ? "TPS2832" : "BNC IN"}
          <span>{buck ? "Gate driver" : "Input"}</span>
        </div>
        <svg
          className="diagram-connector"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 1H100" stroke="var(--wire)" strokeWidth="2" />
        </svg>
        <div className="diagram-block">
          {buck ? "2 power MOSFETs" : "TLV2372"}
          <span>{buck ? "Step-down" : "Op-amp"}</span>
        </div>
        <div className="diagram-block diagram-control">
          {buck ? "Op-amp current sensing" : "Potentiometer"}
          <span>{buck ? "0.5 ohm shunt" : "Gain control"}</span>
        </div>
      </div>
      <figcaption>
        Simplified functional diagram
        {buck ? " · solid ground plane" : " · SOIC-8 assembly"}
      </figcaption>
    </figure>
  );
}
