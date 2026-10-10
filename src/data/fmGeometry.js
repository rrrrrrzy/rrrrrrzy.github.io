// Content follows arXiv:2607.27933v3, Table 2, and the supplied demo recordings.
export const FM_PAPER = {
    title: 'The Geometric Nature of Flow Matching Uncertainty',
    subtitle: 'A Cost-free Uncertainty Proxy and Application in Flow-based VLA Failure Detection',
    paper: 'https://arxiv.org/pdf/2607.27933',
    code: 'https://github.com/rrrrrrzy/fm-geometry',
    authors: [
        { name: 'Ziyang Rao', affiliations: '1,4', href: '/' },
        { name: 'Yiren Zhao', affiliations: '1,4' },
        { name: 'Weiyu Guo', affiliations: '3,4' },
        { name: 'Ben Fei', affiliations: '3' },
        { name: 'Yandong Guo', affiliations: '4' },
        { name: 'Hui Xiong', affiliations: '1,2', corresponding: true },
    ],
    affiliations: ['HKUST (Guangzhou)', 'HKUST', 'CUHK', 'AI² Robotics'],
    contributions: [
        { title: 'Uncertainty has a geometry.', text: 'A certain flow contracts toward a single target. Multimodality and out-of-distribution inputs deform this ideal field and change the denoising path.' },
        { title: 'One path is already enough.', text: 'Denoising acceleration reads velocity variation from the trajectory the policy already computes. No extra model calls, resampling, or proxy training.' },
        { title: 'Turn hesitation into a signal.', text: 'Combine accel with a calibrated CUSUM monitor to flag failing rollouts before termination, across different flow-based VLA architectures.' },
    ],
    faithfulness: {
        zeroBaseline: 'For an ideal certain field, the target is fixed and denoising velocity is constant. Every prefix has exactly zero accel, including under Euler discretization.',
        monotonicity: 'For a fixed covariance shape Σ₀ with Σ = σ²Σ₀, the expected prefix score grows with posterior variance to leading order, with κ(τ) > 0. Greater uncertainty therefore produces a larger expected accel.',
        scope: 'The guarantee is local and in expectation: it assumes an exact CFM field, small posterior spread with fixed covariance shape, and a prefix away from the clean-action endpoint. It is not a pointwise or universal ranking guarantee.',
        empirical: 'Across all 12 model × benchmark settings, accel positively correlates with the uncertainty measured by repeated action sampling. Best-prefix correlations range from 0.586 to 0.844, demonstrating that the free geometric signal consistently tracks posterior spread across architectures and tasks.',
    },
    // Pooled Spearman correlations, arXiv:2607.27933v3, Table 1.
    correlations: [
        { model: 'π₀.₅', benchmark: 'D3IL', chunks: 712, full: .826, best: .844, prefix: '9/10' },
        { model: 'π₀.₅', benchmark: 'LIBERO', chunks: 32647, full: .541, best: .792, prefix: '5/10' },
        { model: 'π₀.₅', benchmark: 'RoboCasa', chunks: 8277, full: .381, best: .684, prefix: '3/10' },
        { model: 'SmolVLA', benchmark: 'D3IL', chunks: 576, full: .725, best: .834, prefix: '7/10' },
        { model: 'SmolVLA', benchmark: 'LIBERO', chunks: 16157, full: .523, best: .638, prefix: '6/10' },
        { model: 'SmolVLA', benchmark: 'RoboCasa', chunks: 21657, full: .639, best: .816, prefix: '4/10' },
        { model: 'GR00T-N1.7', benchmark: 'D3IL', chunks: 732, full: .622, best: .642, prefix: '3/4' },
        { model: 'GR00T-N1.7', benchmark: 'LIBERO', chunks: 23273, full: .656, best: .656, prefix: '4/4' },
        { model: 'GR00T-N1.7', benchmark: 'RoboCasa', chunks: 14613, full: .565, best: .592, prefix: '3/4' },
        { model: 'VLA-JEPA', benchmark: 'LIBERO', chunks: 26980, full: .679, best: .679, prefix: '4/4' },
        { model: 'VLA-JEPA', benchmark: 'RoboCasa', chunks: 13728, full: .547, best: .586, prefix: '3/4' },
        { model: 'Toy FM', benchmark: 'D3IL', chunks: 673, full: .680, best: .726, prefix: '8/10' },
    ],
    models: ['π₀.₅', 'SmolVLA', 'GR00T-N1.7', 'VLA-JEPA'],
    // TPR means from Table 2; first four cells LIBERO, last four RoboCasa.
    results: [
        { name: 'Accel', kind: 'Geometry · ours', values: [.85, .87, .53, .82, .49, .77, .55, .40], average: .66, ours: true },
        { name: 'Straightness', kind: 'Geometry · ours', values: [.78, .87, .58, .64, .43, .83, .60, .42], average: .65, ours: true },
        { name: 'ACE', kind: 'Resampling', values: [.85, .64, .68, .66, .30, .25, .62, .42], average: .55 },
        { name: 'STAC', kind: 'Resampling', values: [.90, .77, .62, .85, .06, .56, .54, .49], average: .60 },
        { name: 'Diff-DAgger', kind: 'Resampling', values: [.67, .65, .51, .86, .31, .51, .50, .16], average: .52 },
        { name: 'FIPER', kind: 'Training + resampling', values: [.81, .59, .67, .73, .33, .25, .60, .42], average: .55 },
        { name: 'RND-OE', kind: 'Training', values: [.38, .31, .63, .53, .30, .44, .20, .39], average: .40 },
        { name: 'LogpZO', kind: 'Training', values: [.38, .31, .65, .46, .36, .48, .21, .42], average: .41 },
        { name: 'SAFE', kind: 'Training', values: [.80, .65, .70, .82, .83, .75, .23, .59], average: .68 },
    ],
    demos: {
        real: [
            { file: 'real-failure', title: 'Failure raises an alarm', tag: 'Failure detected', failure: true, description: 'The geometric score rises and CUSUM crosses the threshold at chunk 5 of 7, with 2 chunks (4.8 s) of lead.' },
            { file: 'real-success', title: 'Success stays quiet', tag: 'Successful rollout', description: 'The score decays as the task progresses. CUSUM remains below the threshold throughout the rollout.' },
        ],
        simulation: [
            { file: 'simulation-mug', title: 'A sustained change in the signal', tag: 'Alarm · chunk 29', failure: true, description: 'The accumulated score crosses the calibrated threshold at chunk 29, leaving 22 chunks before the episode ends.' },
            { file: 'simulation-can', title: 'An early warning during manipulation', tag: 'Alarm · chunk 11', failure: true, description: 'The monitor detects sustained geometric deviation at chunk 11, leaving 40 chunks before the episode ends.' },
        ],
    },
    bibtex: `@article{rao2026geometry,
  title={The Geometry of Flow-Matching Uncertainty: A Cost-free
         Uncertainty Proxy and Application in Flow-based VLA
         Failure Detection},
  author={Rao, Ziyang and Zhao, Yiren and Guo, Weiyu and
          Fei, Ben and Guo, Yandong and Xiong, Hui},
  journal={arXiv preprint arXiv:2607.27933},
  year={2026},
  url={https://arxiv.org/abs/2607.27933}
}`,
};
