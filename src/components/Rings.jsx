import { useGSAP } from '@gsap/react';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Rings = ({ position = [0, 0, 0] }) => {
    const groupRef = useRef();
    const ringsRef = useRef([]);

    // Clear and reset refs on component mount
    useEffect(() => {
        ringsRef.current = [];
        return () => {
            ringsRef.current = [];
        };
    }, []);

    // Function to add refs to our array
    const addRingRef = (el) => {
        if (el && !ringsRef.current.includes(el)) {
            ringsRef.current.push(el);
        }
    };

    // Load texture
    const texture = useTexture('textures/rings.png');

    // Debug position with a useEffect to verify it's receiving the correct position
    useEffect(() => {
        console.log("Rings position:", position);
    }, [position]);

    useGSAP(() => {
        if (!groupRef.current) return;

        // Directly set the group position
        groupRef.current.position.set(position[0], position[1], position[2]);

        // Only animate if we have refs
        if (ringsRef.current.length > 0) {
            gsap.timeline({
                repeat: -1,
                repeatDelay: 0.5,
            })
                .to(
                    ringsRef.current.map(r => r.rotation),
                    {
                        y: `+=${Math.PI * 2}`,
                        x: `-=${Math.PI * 2}`,
                        duration: 2.5,
                        stagger: {
                            each: 0.15,
                        },
                    }
                );
        }
    }, { dependencies: [position] });

    return (
        <group ref={groupRef}>
            {/* Make group more visible with larger scale */}
            <group scale={0.4}>
                {[0, 1, 2, 3].map((index) => (
                    <mesh key={index} ref={addRingRef}>
                        <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
                        <meshStandardMaterial
                            color="#00ffff"
                            emissive="#00ffff"
                            emissiveIntensity={0.5}
                            toneMapped={false}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

export default Rings;