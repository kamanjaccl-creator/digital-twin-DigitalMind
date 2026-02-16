import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function AboutPage() {
  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-md" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="section-label">About the Project</p>
        <h1 className="section-title">About this Digital Twin</h1>
        <div className="page-section">
          <p className="section-desc" style={{ marginBottom: 12 }}>
            Every production web app is a target. This Digital Twin turns that risk into a teaching
            tool: a controlled cyber range where you can deliberately attack, observe detections and
            blocks, practise incident response, and document how you harden the system release by
            release.
          </p>
          <p className="section-desc" style={{ marginBottom: 12 }}>
            For hiring managers, this site is both a portfolio and a live security case study: it
            hosts my professional identity and projects, exposes safe attack surfaces, and shows how
            I manage security as an ongoing lifecycle instead of a one-time checkbox.
          </p>
          <p className="section-desc">
            Use this page to understand the intent behind the lab, how it was built, and how it fits
            into real-world expectations for secure, observable web systems.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
