import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000/
        await page.goto("http://localhost:3000/")
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        assert len(captured_insight_events) > 0, "At least one POST to /_vercel/insights/event should have been sent after copying the install command"
        assert captured_insight_events[0].get('en') == 'copy_npm_command' and isinstance(captured_insight_events[0].get('ed', {}).get('code'), str) and captured_insight_events[0]['ed']['code'].strip() != '' and 'shadcn' in captured_insight_events[0]['ed']['code'], "The analytics payload should have en set to 'copy_npm_command' and ed.code should be a non-empty install command string containing 'shadcn' after copying the install command"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    