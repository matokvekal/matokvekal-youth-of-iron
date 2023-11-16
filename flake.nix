{
  description = "popchor-koeln";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    playwright.url = "github:pietdevries94/playwright-web-flake/1.39.0";
  };

  outputs = { self, nixpkgs, playwright }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        overlays = [
          (final: prev: {
            inherit (playwright.packages.${system})
              playwright-driver
              playwright-test;
          })
        ];
      };

      nodejs = pkgs.nodejs_latest;
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          nodejs
          nodejs.pkgs.pnpm
        ];

        PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.browsers;
        PLAYWRIGHT_BROWSERS_VERSION = pkgs.playwright-driver.version;
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "true";
      };

      checks.${system} =
        let
          inherit (pkgs.lib) getExe;

          checker = name: description: package: versionCommand: pkgs.runCommand "check-${name}-version" { } ''
            version_nix="${package.version}"
            version_non_nix="$(${versionCommand})"

            echo "compare versions for ${description}"
            echo "version_nix:     $version_nix"
            echo "version_non_nix: $version_non_nix"

            [[ "$version_nix" == "$version_non_nix" ]]
            touch $out
          '';
        in
        {
          node = checker "node" "node version for netlify" nodejs ''
            ${getExe pkgs.gnugrep} NODE_VERSION ${./netlify.toml} \
              | ${getExe pkgs.gnused} -e 's,^.*"\(.*\)"$,\1,'
          '';

          playwright = checker "playwright" "npm package @playwright/test" pkgs.playwright-driver ''
            ${getExe pkgs.jq} --raw-output '.devDependencies."@playwright/test"' ${./package.json}
          '';

          pnpm = checker "pnpm" "pnpm version in package.json" nodejs.pkgs.pnpm ''
            ${getExe pkgs.jq} --raw-output '.packageManager' ${./package.json} \
              | ${getExe pkgs.gnused} -e 's,pnpm@,,'
          '';
        };
    };
}
