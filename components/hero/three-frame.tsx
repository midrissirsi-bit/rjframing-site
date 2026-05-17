"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Piece = {
  mesh: THREE.Mesh | THREE.LineSegments;
  threshold: number;
  isSteel?: boolean;
};

export function ThreeFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buildBarRef = useRef<HTMLDivElement>(null);
  const buildPctRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      document.body.classList.add("no-webgl");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x060709, 16, 36);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const W = 8, D = 5;
    const WALL_H = 2.5, RIDGE_H = 1.8;
    const STUD = 0.4, JOIST = 0.4, RAFTER = 0.6;
    const PLATE = 0.3;
    const halfW = W / 2, halfD = D / 2;
    const wallTop = PLATE + WALL_H;
    const ridgeY = wallTop + RIDGE_H;

    const timberMat = new THREE.MeshBasicMaterial({ color: 0x8895a3, transparent: true, opacity: 0 });
    const timberDimMat = new THREE.MeshBasicMaterial({ color: 0x4d5764, transparent: true, opacity: 0 });
    const steelMat = new THREE.MeshBasicMaterial({ color: 0x29c5e8, transparent: true, opacity: 0 });

    const root = new THREE.Group();
    root.position.y = -1.8;
    scene.add(root);

    const grid = new THREE.GridHelper(20, 20, 0x1c2530, 0x121822);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.0;
    grid.position.y = -0.002;
    root.add(grid);

    const pieces: Piece[] = [];

    function cyl(
      x1: number, y1: number, z1: number,
      x2: number, y2: number, z2: number,
      radius: number, material: THREE.MeshBasicMaterial,
    ) {
      const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const geom = new THREE.CylinderGeometry(radius, radius, len, 6, 1, false);
      const mat = material.clone();
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
      const axis = new THREE.Vector3(dx, dy, dz).normalize();
      const yAxis = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(yAxis, axis);
      mesh.quaternion.copy(quat);
      mesh.scale.set(0.0001, 0.0001, 0.0001);
      return mesh;
    }
    function addPiece(mesh: THREE.Mesh, opts: Partial<Piece> = {}) {
      root.add(mesh);
      pieces.push({ mesh, threshold: 0, ...opts });
      return mesh;
    }

    const STUD_R = 0.025, PLATE_R = 0.035, JOIST_R = 0.03, RAFTER_R = 0.028;

    // Foundation
    addPiece(cyl(-halfW, 0, -halfD,  halfW, 0, -halfD, PLATE_R, timberDimMat));
    addPiece(cyl( halfW, 0, -halfD,  halfW, 0,  halfD, PLATE_R, timberDimMat));
    addPiece(cyl( halfW, 0,  halfD, -halfW, 0,  halfD, PLATE_R, timberDimMat));
    addPiece(cyl(-halfW, 0,  halfD, -halfW, 0, -halfD, PLATE_R, timberDimMat));

    // Floor joists
    for (let x = -halfW; x <= halfW + 0.001; x += JOIST) {
      addPiece(cyl(x, PLATE * 0.5, -halfD, x, PLATE * 0.5, halfD, JOIST_R, timberDimMat));
    }

    // Bottom plates
    addPiece(cyl(-halfW, PLATE, -halfD,  halfW, PLATE, -halfD, PLATE_R, timberMat));
    addPiece(cyl( halfW, PLATE, -halfD,  halfW, PLATE,  halfD, PLATE_R, timberMat));
    addPiece(cyl( halfW, PLATE,  halfD, -halfW, PLATE,  halfD, PLATE_R, timberMat));
    addPiece(cyl(-halfW, PLATE,  halfD, -halfW, PLATE, -halfD, PLATE_R, timberMat));

    // Long wall studs
    for (let x = -halfW; x <= halfW + 0.001; x += STUD) {
      addPiece(cyl(x, PLATE, -halfD, x, wallTop, -halfD, STUD_R, timberMat));
    }
    for (let x = -halfW; x <= halfW + 0.001; x += STUD) {
      addPiece(cyl(x, PLATE,  halfD, x, wallTop,  halfD, STUD_R, timberMat));
    }
    // Short wall studs
    for (let z = -halfD + STUD; z <= halfD - 0.001; z += STUD) {
      addPiece(cyl( halfW, PLATE, z,  halfW, wallTop, z, STUD_R, timberMat));
      addPiece(cyl(-halfW, PLATE, z, -halfW, wallTop, z, STUD_R, timberMat));
    }

    // Top plates
    addPiece(cyl(-halfW, wallTop, -halfD,  halfW, wallTop, -halfD, PLATE_R, timberMat));
    addPiece(cyl( halfW, wallTop, -halfD,  halfW, wallTop,  halfD, PLATE_R, timberMat));
    addPiece(cyl( halfW, wallTop,  halfD, -halfW, wallTop,  halfD, PLATE_R, timberMat));
    addPiece(cyl(-halfW, wallTop,  halfD, -halfW, wallTop, -halfD, PLATE_R, timberMat));

    // Steel I-beam
    const steelGeom = new THREE.BoxGeometry(W, 0.18, 0.12);
    const steelMesh = new THREE.Mesh(steelGeom, steelMat.clone());
    steelMesh.position.set(0, wallTop - 0.12, 0);
    steelMesh.scale.set(0.0001, 0.0001, 0.0001);
    root.add(steelMesh);
    pieces.push({ mesh: steelMesh, threshold: 0, isSteel: true });

    const steelEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(steelGeom),
      new THREE.LineBasicMaterial({ color: 0x29c5e8, transparent: true, opacity: 0 }),
    );
    steelEdges.position.copy(steelMesh.position);
    steelEdges.scale.set(0.0001, 0.0001, 0.0001);
    root.add(steelEdges);
    pieces.push({ mesh: steelEdges, threshold: 0, isSteel: true });

    // Ridge beam
    addPiece(cyl(-halfW, ridgeY, 0,  halfW, ridgeY, 0, PLATE_R, timberMat));

    // Rafters
    for (let x = -halfW; x <= halfW + 0.001; x += RAFTER) {
      addPiece(cyl(x, wallTop, -halfD,  x, ridgeY, 0, RAFTER_R, timberMat));
      addPiece(cyl(x, wallTop,  halfD,  x, ridgeY, 0, RAFTER_R, timberMat));
    }

    // Gable end studs - front (z = halfD) and back (z = -halfD) walls.
    // Vertical studs from the top plate up to the rafter slope line.
    // Slope: at x=plusminus halfW, height = wallTop (eave); at x=0, height = ridgeY (peak).
    [-halfD, halfD].forEach((z) => {
      for (let x = -halfW + STUD; x <= halfW - 0.001; x += STUD) {
        const slopeHeight = wallTop + (ridgeY - wallTop) * (1 - Math.abs(x) / halfW);
        if (slopeHeight > wallTop + 0.08) {
          addPiece(cyl(x, wallTop, z, x, slopeHeight, z, STUD_R, timberMat));
        }
      }
    });
    
    // Thresholds
    pieces.forEach((p, i) => { p.threshold = i / pieces.length; });

    // Orbit + auto-rotate
    let rotY = -0.7, rotX = 0.45;
    let targetRotY = -0.7, targetRotX = 0.45;
    let dragging = false, lastX = 0, lastY = 0;
    let lastInteraction = 0;
    let autoRotate = true;
    const DIST = 17;

    function onDown(e: PointerEvent) {
      dragging = true;
      autoRotate = false;
      lastInteraction = Date.now();
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      targetRotY -= dx * 0.008;
      targetRotX = Math.max(0.1, Math.min(1.2, targetRotX - dy * 0.006));
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onUp() {
      dragging = false;
      lastInteraction = Date.now();
    }
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    setTimeout(resize, 0);

    let buildProgress = 0;
    const trigger = ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => { buildProgress = self.progress; },
      onEnter: () => buildBarRef.current?.classList.add("show"),
      onLeave: () => {
        buildBarRef.current?.classList.remove("show");
        hintRef.current?.classList.add("show");
      },
      onEnterBack: () => buildBarRef.current?.classList.add("show"),
    });

    const hintTimer = window.setTimeout(() => hintRef.current?.classList.add("show"), 6000);

    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

    let rafId = 0;
    function frame() {
      rafId = requestAnimationFrame(frame);

      pieces.forEach((p) => {
        const local = Math.max(0, Math.min(1, (buildProgress - p.threshold) * 12));
        const eased = easeOutCubic(local);
        const scale = Math.max(0.0001, eased);
        p.mesh.scale.set(scale, scale, scale);
        if (p.mesh.material) {
          const target = p.isSteel ? Math.min(1, eased * 1.2) : eased;
          (p.mesh.material as THREE.Material & { opacity: number }).opacity = target;
        }
      });
      const gridMat = grid.material as THREE.Material & { opacity: number };
      if (gridMat.opacity < 0.6) gridMat.opacity = Math.min(0.6, gridMat.opacity + 0.005);

      if (!dragging && Date.now() - lastInteraction > 3000) autoRotate = true;
      if (autoRotate) targetRotY += 0.0014;
      rotY += (targetRotY - rotY) * 0.08;
      rotX += (targetRotX - rotX) * 0.08;

      camera.position.x = Math.cos(rotY) * Math.cos(rotX) * DIST;
      camera.position.y = Math.sin(rotX) * DIST;
      camera.position.z = Math.sin(rotY) * Math.cos(rotX) * DIST;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);

      if (buildBarRef.current) {
        const span = buildBarRef.current.querySelector("span") as HTMLSpanElement | null;
        if (span) span.style.inset = "0 " + ((1 - buildProgress) * 100) + "% 0 0";
      }
      if (buildPctRef.current) {
        buildPctRef.current.textContent = Math.round(buildProgress * 100) + "%";
      }
    }
    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(hintTimer);
      trigger.kill();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hero-3d-canvas" />
      <div ref={buildBarRef} className="build-bar">
        <span className="mono-label" style={{ minWidth: 80 }}>FRAMING</span>
        <div className="bar"><span /></div>
        <span ref={buildPctRef} className="font-mono text-[10px] tracking-[0.18em] text-bone" style={{ minWidth: 36 }}>0%</span>
      </div>
      <div ref={hintRef} className="rotate-hint">
        <span className="ring" />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase">Drag to rotate</span>
      </div>
    </>
  );
}
