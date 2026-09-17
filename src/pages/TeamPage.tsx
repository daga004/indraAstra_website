import { FallbackNotice, LoadingState } from '../components/LoadingState';
import { TeamCard } from '../components/TeamCard';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getTeamMembers } from '../services/teamService';

export function TeamPage() {
  const { data: result, loading } = useAsyncResource(getTeamMembers);
  usePageMetadata('Team | IndraAstra', 'Meet the people behind IndraAstra’s AI performance engineering and research work.');

  return (
    <section className="team-page">
      <div className="section-header">
        <div className="section-label">04 / The Team</div>
        <h2>Research Depth, <span className="gradient-text">Engineering Instinct</span></h2>
        <p>A focused team working at the intersection of AI performance and novel information-processing systems.</p>
      </div>
      {loading || !result ? (
        <LoadingState label="Loading team" />
      ) : result.data.length > 0 ? (
        <>
          <div className="team-grid">
            {result.data.map((member) => <TeamCard key={member.id} member={member} />)}
          </div>
          {result.warning && <FallbackNotice message={result.warning} />}
        </>
      ) : (
        <div className="empty-state"><h2>Team information is being updated.</h2><p>Please check back soon.</p></div>
      )}
    </section>
  );
}
