import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, Copy, FileText, Github, Menu, Moon, Play, Quote, Sun, X } from 'lucide-react';
import { FM_PAPER as paper } from '../data/fmGeometry';
import './PaperPage.css';

const media = '/fm-geometry/media/';
const sections = [['overview', 'Overview'], ['demos', 'Demos'], ['method', 'Method'], ['results', 'Results'], ['citation', 'BibTeX']];

function SectionHeading({ number, eyebrow, title, children }) {
    return <header className="paper-section-heading">
        <div className="paper-eyebrow"><span>{number}</span> {eyebrow}</div>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
    </header>;
}

function Figure({ name, alt, children, className = '' }) {
    return <figure className={`paper-figure ${className}`}>
        <a href={`${media}${name}.webp`} target="_blank" rel="noreferrer" aria-label={`Enlarge figure: ${alt}`}>
            <img src={`${media}${name}.webp`} alt={alt} loading="lazy" />
        </a>
        {children && <figcaption>{children}</figcaption>}
    </figure>;
}

function DemoCard({ demo }) {
    return <article className="paper-demo-card">
        <div className="paper-demo-label"><span className={demo.failure ? 'signal-warning' : 'signal-success'} />{demo.tag}</div>
        <video key={demo.file} controls muted playsInline preload="none" poster={`${media}${demo.file}.jpg`} aria-label={demo.title}>
            <source src={`${media}${demo.file}.mp4`} type="video/mp4" />
            <a href={`${media}${demo.file}.mp4`}>Download video</a>
        </video>
        <div className="paper-demo-caption"><h3>{demo.title}</h3><p>{demo.description}</p></div>
    </article>;
}

function CorrelationEvidence() {
    const [dataset, setDataset] = useState('LIBERO');
    const rows = paper.correlations.filter(row => row.benchmark === dataset);
    return <div className="paper-empirical">
        <p className="paper-faithfulness-subtitle">One trajectory tracks the uncertainty measured by resampling.</p>
        <p className="paper-faithfulness-intro">{paper.faithfulness.empirical}</p>
        <div className="paper-faithfulness-stats"><div><strong>12 / 12</strong><span>Settings with positive rank correlation</span></div><div><strong>0.844</strong><span>Highest best-prefix Spearman ρ</span></div><div><strong>3 benchmarks</strong><span>D3IL · LIBERO · RoboCasa</span></div></div>
        <div className="paper-correlation-chart">
            <div className="paper-correlation-toolbar"><div className="paper-segmented" role="group" aria-label="Select uncertainty correlation benchmark">{['D3IL', 'LIBERO', 'RoboCasa'].map(name => <button key={name} aria-pressed={dataset === name} onClick={() => setDataset(name)}>{name}</button>)}</div><div className="paper-chart-legend"><span><i /> Full path</span><span><i /> Best prefix</span></div></div>
            <div className="paper-correlation-axis"><span>Spearman rank correlation ρ ↑</span><span>0 → 1</span></div>
            <div className="paper-correlation-rows" aria-live="polite" aria-atomic="true">{rows.map(row => <div className="paper-correlation-row" key={row.model}>
                <div className="paper-correlation-model"><strong>{row.model}</strong><span>{row.chunks.toLocaleString('en-US')} chunks · p*/T = {row.prefix}</span></div>
                <div className="paper-correlation-bars">{[['full', row.full, 'Full path'], ['best', row.best, 'Best prefix']].map(([kind, value, label]) => <div className={`paper-correlation-bar ${kind}`} key={kind} aria-label={`${row.model}, ${dataset}, ${label}: ${value.toFixed(3)}`}><div className="paper-bar-track" aria-hidden="true"><i style={{ width: `${value * 100}%` }} /></div><span aria-hidden="true">{value.toFixed(3)}</span></div>)}</div>
            </div>)}</div>
            <p className="paper-small">Table 1 · Pooled chunk-level correlation with resampled action divergence. Best prefix is the highest correlation over evaluated prefix lengths, not a separately held-out prefix choice. The 12 settings include four VLA architectures and a toy FM model.</p>
        </div>
    </div>;
}

export default function PaperPage({ isDark, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('overview');
    const [benchmark, setBenchmark] = useState('libero');
    const [demoGroup, setDemoGroup] = useState('real');
    const [copyStatus, setCopyStatus] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
        }, { rootMargin: '-15% 0px -65% 0px' });
        sections.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
        return () => observer.disconnect();
    }, []);

    const copyCitation = async () => {
        try { await navigator.clipboard.writeText(paper.bibtex); setCopyStatus('Copied'); }
        catch { setCopyStatus('Select the citation below to copy.'); }
    };

    return <div className={isDark ? 'dark' : ''}>
        <div className="paper-page">
            <a className="paper-skip" href="#overview">Skip to content</a>
            <div className="paper-stripe" aria-hidden="true"><i /><i /><i /><i /></div>
            <nav className="paper-nav" aria-label="Project navigation">
                <div className="paper-container paper-nav-inner">
                    <a href="#top" className="paper-wordmark">FM<span>/</span>GEOMETRY</a>
                    <div className={`paper-nav-links ${menuOpen ? 'is-open' : ''}`}>
                        {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
                    </div>
                    <div className="paper-nav-actions">
                        <a href="/#blog" className="paper-owner" aria-label="Back to Ziyang Rao’s blog"><ArrowLeft size={13} /> ZIYANG RAO</a>
                        <button onClick={toggleTheme} className="paper-icon-button" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>{isDark ? <Moon size={17} /> : <Sun size={17} />}</button>
                        <button className="paper-icon-button paper-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle project navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
                    </div>
                </div>
            </nav>

            <main id="top">
                <header className="paper-hero paper-container">
                    <div className="paper-eyebrow"><span className="paper-status-dot" /> FLOW MATCHING · UNCERTAINTY · ROBOTICS <span className="paper-preprint">ARXIV 2026</span></div>
                    <h1>The Geometric Nature of<br /><span>Flow Matching Uncertainty</span></h1>
                    <p className="paper-subtitle">{paper.subtitle}</p>
                    <div className="paper-authors">{paper.authors.map(author => <span key={author.name}>
                        {author.href ? <a href={author.href}>{author.name}</a> : author.name}<sup>{author.affiliations}{author.corresponding ? '*' : ''}</sup>
                    </span>)}</div>
                    <div className="paper-affiliations">{paper.affiliations.map((name, i) => <span key={name}><sup>{i + 1}</sup>{name}</span>)}</div>
                    <p className="paper-corresponding">* Corresponding author</p>
                    <div className="paper-resource-links">
                        <a className="paper-button paper-button-primary" href={paper.paper} target="_blank" rel="noreferrer"><FileText size={17} /> Read the paper <ArrowRight size={15} /></a>
                        <a className="paper-button" href={paper.code} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>
                        <a className="paper-button" href="#demos"><Play size={17} /> Video</a>
                        <a className="paper-button" href="#citation"><Quote size={17} /> BibTeX</a>
                    </div>
                    <figure className="paper-epigraph">
                        <blockquote><p>There is a goal, but no way; what we call the way is hesitation.</p></blockquote>
                        <figcaption>— Franz Kafka, <cite>The Zürau Aphorisms</cite></figcaption>
                    </figure>
                </header>

                <section id="overview" className="paper-container paper-overview">
                    <div className="paper-lead-panel">
                        <div className="paper-lead-copy"><div className="paper-eyebrow">THE IDEA IN ONE SENTENCE</div>
                            <h2>The path to an action<br />reveals its uncertainty.</h2>
                            <p>Read <strong>denoising acceleration</strong> from the trajectory your policy already computes. A geometric signal for knowing when a robot’s next action deserves a second look.</p>
                            <a href="#method" className="paper-text-link">Explore the geometry <ArrowDown size={15} /></a>
                        </div>
                        <figure><img src={`${media}teaser.webp`} alt="An ideally confident flow contracts to one endpoint; an uncertain field deforms the denoising trajectories." fetchPriority="high" /><figcaption>From a certain flow to an uncertain field.</figcaption></figure>
                    </div>
                    <div className="paper-contributions paper-overview-contributions">{paper.contributions.map((item, i) => <article key={item.title}><span className="paper-card-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
                </section>

                <section id="demos" className="paper-container paper-film">
                    <span id="film" className="paper-anchor" />
                    <div className="paper-film-heading"><span className="paper-eyebrow">WATCH IT IN ACTION</span><span>Simulation & real hardware</span></div>
                    <h2>Real time failure detection at zero cost.</h2>
                    <p className="paper-film-description">From simulation to a physical arm: the trajectory supplies the score, and CUSUM tracks sustained deviations.</p>
                    <div className="paper-segmented paper-demo-switch" role="group" aria-label="Select demonstration environment"><button aria-pressed={demoGroup === 'real'} onClick={() => setDemoGroup('real')}>Real hardware</button><button aria-pressed={demoGroup === 'simulation'} onClick={() => setDemoGroup('simulation')}>Simulation</button></div>
                    <div className="paper-demo-grid">{paper.demos[demoGroup].map(demo => <DemoCard key={demo.file} demo={demo} />)}</div>
                </section>

                <section id="method" className="paper-section paper-section-tint">
                    <div className="paper-container">
                        <SectionHeading number="01" eyebrow="THE METHOD" title="A geometric read, already in the forward pass.">Grounded in flow geometry. Validated against resampled uncertainty. A single denoising path supplies both the signal and the evidence.</SectionHeading>
                        <Figure name="fm_field" alt="Flow fields under certainty, aleatoric uncertainty, and epistemic uncertainty, with toy and robotic examples">A single target produces a straight path; multiple plausible actions produce branches; unfamiliar inputs can scatter endpoints and bend the path. Figure 2 of the paper.</Figure>
                        <div className="paper-equation-panel">
                            <div><span className="paper-eyebrow">DENOISING ACCELERATION</span><div className="paper-equation" aria-label="accel p equals p times the sum of norms of consecutive velocity differences divided by the sum of velocity norms"><i>accel</i><sub>p</sub><span>=</span><span className="paper-fraction"><span>p ∑<sub>t=1</sub><sup>p−1</sup> ‖v<sub>t</sub> − v<sub>t−1</sub>‖</span><span>∑<sub>t=0</sub><sup>p−1</sup> ‖v<sub>t</sub>‖</span></span></div></div>
                            <p>Velocity variation, normalized by mean speed. Here <i>p</i> is the denoising prefix length. The proxy requires no training; the failure detector’s threshold is calibrated on successful rollouts.</p>
                        </div>
                        <section className="paper-faithfulness" aria-labelledby="faithfulness-title">
                            <h3 id="faithfulness-title">Theoretical and Empirical Faithfulness</h3>
                            <p className="paper-faithfulness-subtitle">Grounded in flow geometry and validated against resampled uncertainty.</p>
                            <p className="paper-faithfulness-intro">Path acceleration tracks changes in the posterior mean the denoiser is chasing, connecting a single trajectory to posterior covariance. The paper establishes two properties that make accel a faithful uncertainty proxy.</p>
                            <div className="paper-theory-grid">
                                <article><span className="paper-eyebrow">ZERO BASELINE</span><h4>Zero uncertainty. Zero acceleration.</h4><div className="paper-theory-equation" aria-label="Zero posterior covariance implies zero acceleration">Σ = 0 <span>⇒</span> accel<sub>p</sub> = 0</div><p>{paper.faithfulness.zeroBaseline}</p></article>
                                <article><span className="paper-eyebrow">LOCAL MONOTONICITY</span><h4>More uncertainty. A larger expected signal.</h4><div className="paper-theory-equation" aria-label="Expected acceleration is approximately kappa times posterior variance, with positive kappa">E[accel<sub>τ</sub>] ≈ κ(τ) σ²</div><p>{paper.faithfulness.monotonicity}</p></article>
                            </div>
                            <p className="paper-small paper-theory-scope">{paper.faithfulness.scope} <a href={`${paper.paper}#page=4`} target="_blank" rel="noreferrer">Theory and proofs ↗</a></p>
                            <CorrelationEvidence />
                        </section>
                        <div className="paper-evidence-grid"><div><div className="paper-eyebrow">FROM GEOMETRY TO UNCERTAINTY</div><h3>When the path bends,<br />the action distribution spreads.</h3><p>On D3IL, darker trajectory segments have higher accel. At those decision points, resampled action chunks fan out more widely, linking the single-path signal to posterior spread.</p></div><Figure name="d3il_accel_branches" alt="D3IL trajectory colored by acceleration, with gray resampled action branches" /></div>
                    </div>
                </section>

                <section id="results" className="paper-container paper-section">
                    <SectionHeading number="02" eyebrow="EXPERIMENTS" title="A free signal. Competitive detection.">Evaluated on four flow-based VLAs across LIBERO-all and RoboCasa Atomic-Seen.</SectionHeading>
                    <div className="paper-result-summary"><div><strong>0.66</strong><span>Average TPR · accel</span></div><div><strong>0.68</strong><span>Average TPR · trained SAFE baseline</span></div><p>Accel approaches the strongest average baseline without training a probe or resampling actions. All detectors use the same calibrated CUSUM monitor.</p></div>
                    <div className="paper-table-toolbar"><div className="paper-segmented" role="group" aria-label="Select benchmark"><button aria-pressed={benchmark === 'libero'} onClick={() => setBenchmark('libero')}>LIBERO-all</button><button aria-pressed={benchmark === 'robocasa'} onClick={() => setBenchmark('robocasa')}>RoboCasa</button></div><span>True positive rate ↑ · target FPR 0.10</span></div>
                    <div className="paper-table-scroll" tabIndex={0} role="region" aria-label="Failure detection results, scroll horizontally on small screens">
                        <table><caption>{benchmark === 'libero' ? 'LIBERO-all' : 'RoboCasa Atomic-Seen'} · Mean TPR over 5 runs (Table 2)</caption><thead><tr><th scope="col">Detector</th>{paper.models.map(model => <th key={model} scope="col">{model}</th>)}<th scope="col">Reported avg.</th></tr></thead><tbody>{paper.results.map(row => <tr key={row.name} className={row.ours ? 'paper-row-ours' : ''}><th scope="row">{row.name}<span>{row.kind}</span></th>{row.values.slice(benchmark === 'libero' ? 0 : 4, benchmark === 'libero' ? 4 : 8).map((value, i) => <td key={i}>{value.toFixed(2)}</td>)}<td>{row.average.toFixed(2)}</td></tr>)}</tbody></table>
                    </div>
                    <p className="paper-small paper-table-note">Table 2, arXiv v3. Resampling budget K = 32; training budget 32 rollouts (SAFE: 16 successful + 16 failed); calibration uses 50 held-out successes. The last column reproduces the paper’s reported average across all eight model × benchmark settings. GR00T-N1.7 is undertrained on LIBERO-all. See the paper for standard deviations and detection leads.</p>
                    <details className="paper-details"><summary>How much of the denoising path should we read?</summary><div className="paper-prefix-grid"><Figure name="denoise_step_sweep_prefix_curves" alt="Rank correlation peaks at an interior denoising prefix across step counts" /><div><h3>A prefix can be more informative than the full path.</h3><p>Truncating the end of the denoising trajectory often improves the correlation between accel and resampled action spread. The detector uses the second-to-last prefix over the executed action window.</p><a className="paper-text-link" href={paper.paper} target="_blank" rel="noreferrer">Read the analysis <ArrowRight size={14} /></a></div></div></details>
                    <div className="paper-limitations"><span className="paper-eyebrow">WHAT THE SIGNAL CAN MISS</span><h3>Confidence is not a guarantee of correctness.</h3><p>Accel can miss a confidently wrong action, such as a misinterpreted instruction, or precision errors whose geometric changes are too small to distinguish from noise. It reads uncertainty in the FM head, not every possible cause of task failure.</p></div>
                </section>

                <section id="citation" className="paper-container paper-section">
                    <SectionHeading number="03" eyebrow="BUILD ON THIS WORK" title="Code & citation.">Explore the implementation, reproduce the experiments, or cite the paper.</SectionHeading>
                    <a className="paper-repo-link" href={paper.code} target="_blank" rel="noreferrer"><Github size={25} /><div><strong>rrrrrrzy / fm-geometry</strong><span>Reference implementation · experiment pipeline · reproduction guide</span></div><ArrowRight size={20} /></a>
                    <div className="paper-citation"><div className="paper-citation-toolbar"><span>BIBTEX</span><button onClick={copyCitation}>{copyStatus === 'Copied' ? <Check size={14} /> : <Copy size={14} />}{copyStatus === 'Copied' ? 'Copied' : 'Copy citation'}</button></div><pre><code>{paper.bibtex}</code></pre><span className="paper-copy-status" role="status">{copyStatus}</span></div>
                </section>
            </main>
            <footer className="paper-footer paper-container"><a className="paper-wordmark" href="#top">FM<span>/</span>GEOMETRY</a><p>{paper.title} · 2026</p><a href="/#blog"><ArrowLeft size={14} /> Ziyang Rao’s homepage</a></footer>
        </div>
    </div>;
}
