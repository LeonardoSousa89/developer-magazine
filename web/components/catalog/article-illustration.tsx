type Illustration = 'ribbon' | 'grid' | 'mesh' | 'boxes';

const scenes = {
  ribbon: (
    <>
      <path
        className="ink-shadow"
        d="M113 198 281 100l180 56-159 103zM410 215l135-86 233 51-142 91z"
      />
      <g transform="translate(125 73) skewY(12)">
        <rect className="ink-paper" width="230" height="142" />
        <path d="M0 30h230M24 55h111M24 78h145M24 102h105" />
        <path className="ink-accent" d="M175 67h27v46h-27z" />
      </g>
      <path className="ink-accent" d="m375 137 72 3-9-17 49 31-56 19 12-16-68-4z" />
      <g transform="translate(508 37) skewY(11)">
        <rect className="ink-paper" width="252" height="174" />
        <path d="M0 32h252M22 17h1m15 0h1m15 0h1" />
        <path className="ink-accent" d="M21 52h210v43H21zM22 111h57v44H22z" />
        <path d="M97 111h57v44H97zM172 111h57v44h-57z" />
      </g>
    </>
  ),
  grid: (
    <>
      <path
        className="ink-shadow"
        d="m85 195 129-57 140 67-113 59zm425 11 134-55 166 61-139 61z"
      />
      <path className="ink-paper" d="M108 87h169v115H108z" />
      <path d="M125 106h135v76H125zM153 146l18-14 18 14m13 10h26" />
      <path className="ink-accent" d="M92 201h202l-22 20H111z" />
      <path
        className="ink-trail"
        d="M296 105h252m-18-16 18 16-18 16m-78 50h-47m-83 0h-26m18-15-18 15 18 15"
      />
      <path
        className="ink-accent"
        d="m388 142 9 17 20-3-11 17 12 15-20 1-9 18-7-18-20-1 13-15-11-17 19 4z"
      />
      <g transform="translate(574 58) skewY(-9)">
        <path className="ink-paper" d="M0 0h125v159H0z" />
        <path className="ink-accent" d="m125 0 59 34v156l-59-31z" />
        <path d="M13 24h99v27H13zM13 66h99v27H13zM13 108h99v27H13zM24 37h1m-1 42h1m-1 42h1M44 37h55M44 79h55M44 121h55" />
      </g>
    </>
  ),
  mesh: (
    <>
      <path
        className="ink-shadow"
        d="m119 205 212-55 149 65-210 48zm393-1 189-60 114 46-180 66z"
      />
      <g transform="translate(131 77) skewY(-10)">
        <path className="ink-paper" d="M0 0h206v143H0z" />
        <path d="M24 23v96h153M52 95h1m19-15h1m31 5h1m22-31h1m22-12h1m13 21h1" />
        <path className="ink-trail" d="m40 104 128-64" />
      </g>
      <path className="ink-accent" d="m360 144 105-16-7-18 55 20-42 38-3-18-104 14z" />
      <g transform="translate(531 55) skewY(10)">
        <rect className="ink-paper" width="218" height="153" />
        <path d="M0 30h218M24 50h44v32H24zM24 94h44v32H24zM86 67h105M86 111h105" />
        <path className="ink-trail" d="m33 64 10 9 16-17m-24 42 21 23m1-23-20 23" />
      </g>
    </>
  ),
  boxes: (
    <>
      <path
        className="ink-shadow"
        d="m63 185 210-63 195 80-204 67zm523 33 99-41 131 39-101 49z"
      />
      <g transform="translate(112 56)">
        <path className="ink-paper" d="m0 55 116-53 174 51-114 57z" />
        <path className="ink-accent" d="m0 55 176 55v96L0 146z" />
        <path className="ink-paper" d="m176 110 114-57v92l-114 61z" />
        <path d="m24 76 0 61m27-52v61m28-52v61m28-51v61m27-52v61m62-58v62m22-73v61m22-72v60m23-70v57" />
      </g>
      <path className="ink-trail" d="M435 116h133m-17-15 17 15-17 15m-6 85H430" />
      <path className="ink-paper" d="M590 89v119c0 32 164 32 164 0V89z" />
      <ellipse className="ink-accent" cx="672" cy="89" rx="82" ry="25" />
      <path d="M590 131c0 31 164 31 164 0m-164 41c0 31 164 31 164 0" />
    </>
  ),
};

export function ArticleIllustration({ scene }: { scene: Illustration }) {
  return (
    <svg aria-hidden="true" className="article-illustration" viewBox="0 0 880 282">
      <defs>
        <pattern id="article-ink-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle className="ink-dot" cx="2" cy="2" r="1.2" />
        </pattern>
      </defs>
      <path className="ink-wash" d="M0 0h880v282H0z" />
      <path fill="url(#article-ink-dots)" d="M0 0h880L641 282H0z" />
      <path
        className="ink-rays"
        d="M0 27l125 37M0 82l88 11M0 250l70-34M320 0l-38 55m92-55-60 66m421-66-36 42m181 2-87 50m87 17-71 17m71 112-78-36m78 70-95-48M351 282l57-67m23 67 16-39"
      />
      <g className="ink-scene">{scenes[scene]}</g>
    </svg>
  );
}
