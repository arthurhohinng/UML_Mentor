import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

// Define types for the node data and props
interface UMLNodeData {
    label?: string;
    attributes?: string[];
    methods?: string[];
    color?: string;
    removeNode?: (id: string) => void;
    isPreview?: boolean;
}

interface UMLNodeProps extends NodeProps<UMLNodeData> {}

const UMLClassNode: React.FC<UMLNodeProps> = ({ data, id }) => {
    const [label, setLabel] = useState<string>(data.label || 'ClassName');
    const [attributes, setAttributes] = useState<string>(data.attributes?.join('\n') || '');
    const [methods, setMethods] = useState<string>(data.methods?.join('\n') || '');
    const headerColor = data.color || '#FFEE93';

    const attributesRef = useRef<HTMLTextAreaElement>(null);
    const methodsRef = useRef<HTMLTextAreaElement>(null);

    // Set height dynamically based on content
    useEffect(() => {
        if (attributesRef.current) {
            attributesRef.current.style.height = 'auto';
            attributesRef.current.style.height = `${attributesRef.current.scrollHeight}px`;
        }
        if (methodsRef.current) {
            methodsRef.current.style.height = 'auto';
            methodsRef.current.style.height = `${methodsRef.current.scrollHeight}px`;
        }
    }, [attributes, methods]);

    // Function to delete the entire node
    const handleDeleteNode = () => {
        data.removeNode?.(id); // Call removeNode from App
    };

    // Set width and height dynamically based on content
    const nodeWidth = 200; // Fixed width for simplicity; you can adjust based on content
    const nodeHeight = 100; // Adjust as needed

    return (
        <div style={{
            border: '1px solid black',
            borderRadius: '5px',
            width: `${nodeWidth}px`,
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            backgroundColor: 'white',
        }}>
            {/* Header with random background color */}
            <div style={{
                backgroundColor: headerColor,
                padding: '10px',
                borderBottom: '1px solid black',
                textAlign: 'center',
                fontWeight: 'bold',
                position: 'relative'
            }}>
                <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    style={{
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                />
                {/* Delete Node Button in the Header */}
                <button
                    onClick={handleDeleteNode}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'transparent',
                        border: 'none',
                        color: 'red',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                >
                    X
                </button>
            </div>

            {/* Attributes Section */}
            <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
                <textarea
                    ref={attributesRef}
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                    placeholder="Attributes"
                    style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
                />
            </div>

            {/* Methods Section */}
            <div style={{ padding: '10px' }}>
                <textarea
                    ref={methodsRef}
                    value={methods}
                    onChange={(e) => setMethods(e.target.value)}
                    placeholder="Methods"
                    style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
                />
            </div>

            {/* Node connection handles */}
            {!data.isPreview && (
                <>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="right"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="target"
                        position={Position.Right}
                        id="right"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="source"
                        position={Position.Left}
                        id="left"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="left"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="source"
                        position={Position.Top}
                        id="top"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="target"
                        position={Position.Top}
                        id="top"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="bottom"
                        style={{ background: '#555' }}
                    />
                    <Handle
                        type="target"
                        position={Position.Bottom}
                        id="bottom"
                        style={{ background: '#555' }}
                    />
                </>
            )}
        </div>
    );
};

export default UMLClassNode;