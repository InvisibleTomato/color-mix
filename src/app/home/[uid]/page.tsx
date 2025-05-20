interface PageProps {
  params: { uid: string };
}

export default function HomePage({ params }: PageProps) {
  return (
    <div>
      <h1>ようこそ、ユーザー {params.uid} さん</h1>
      {/* ユーザーごとのデータをFirestoreから読み込むなど */}
    </div>
  );
}
