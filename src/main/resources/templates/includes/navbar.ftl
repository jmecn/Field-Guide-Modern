    <nav id="nav-primary" class="navbar navbar-expand-lg mb-5" data-bs-theme="dark">
      <div class="container">
        <div class="d-flex align-items-center gap-2">
          <a class="navbar-brand fw-bold mb-0" href="${index}">${title}</a>
          <span id="modpack-version" class="handbook-modpack-version" data-build-root="${root}" hidden></span>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbar-content">
          <ul class="navbar-nav align-items-lg-center">
            <li class="nav-item">
              <form class="d-flex" role="search" onsubmit="handleSearch(event)">
                <input id="search-box" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>

            <li class="nav-item px-2 d-flex align-items-center">
              <div class="handbook-nav-links">
                <a class="nav-link handbook-nav-link" href="https://wiki.terrafirmagreg.team/" target="_blank" rel="noopener noreferrer">Wiki</a>
                <a class="nav-link handbook-nav-link" href="https://discord.com/invite/AEaCzCTUwQ" target="_blank" rel="noopener noreferrer">Discord</a>
              </div>
            </li>

            <li class="nav-item px-2 dropdown">
              <a class="nav-link dropdown-toggle" id="lang-dropdown-button" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-translate"></i> ${current_lang.value}
              </a>
              <div class="dropdown-menu" aria-labelledby="lang-dropdown-button">
                <#list languages as lang>
                <#if lang_page??>
                <a href="${root}/${lang.key}/${lang_page}" class="dropdown-item">${lang.value}</a>
                <#else>
                <a href="${root}/${lang.key}/index.html" class="dropdown-item">${lang.value}</a>
                </#if>
                </#list>
              </div>
            </li>

            <li class="nav-item ps-2 d-flex align-items-center">
              <button id="bd-theme" type="button" class="btn btn-link nav-link px-2 handbook-theme-toggle" aria-label="Toggle theme">
                <i id="bd-theme-icon-light" class="bi bi-sun-fill" hidden></i>
                <i id="bd-theme-icon-dark" class="bi bi-moon-stars-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
