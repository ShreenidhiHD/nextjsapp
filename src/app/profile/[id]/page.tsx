interface ProfilePageProps {
  params: { id: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
    return (
      <div>
        <h1>Profile</h1>
        <span>Welcome {params.id}</span>
      </div>
    );
}