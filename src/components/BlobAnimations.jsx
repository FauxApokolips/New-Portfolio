export default function BlobAnimations() {
  return (
    <>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] 
                      bg-cyan-500/25 blur-[150px] rounded-full animate-blob" />

      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] 
                      bg-purple-500/25 blur-[160px] rounded-full animate-blob-delay" />
    </>
  );
}
