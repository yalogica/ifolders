<?php
defined( 'ABSPATH' ) || exit;

$reasons = [
    "no_longer_needed" => [
        "label" => esc_html__("I do not need this plugin anymore", 'ifolders')
    ],
    "found_better" => [
        "label" => esc_html__("I found another plugin that do the job better", 'ifolders'),
        "input" => esc_html__("Please tell us which one", 'ifolders')
    ],
    "how_to_use" => [
        "label" => esc_html__("I don't know how to use it", 'ifolders')
    ],
    "temporary" => [
        "label" => esc_html__("This's temporary deactivation", 'ifolders')
    ],
    "not_working" => [
        "label" => esc_html__("It's not working on my website", 'ifolders')
    ],
    "other" => [
        "label" => esc_html__("Other", 'ifolders'),
        "input" => esc_html__("Please share a reason...", 'ifolders')
    ]
];
?>
<div id="ifs-feedback" class="ifs-feedback-wrap" style="display:none;">
    <div class="ifs-feedback">
        <div class="ifs-header">
            <h2 class="ifs-title"><?php esc_html_e("Quick Feedback", 'ifolders'); ?></h2>
            <div class="ifs-close"></div>
        </div>
        <div class="ifs-data">
            <p class="ifs-description"><?php esc_html_e("Before you deactivate iFolders could you let us know why? Your feedback will help us improve the product, please tell us why did you decide to deactivate iFolders. Thank you!", 'ifolders'); ?></p>
            <div class="ifs-fields">
                <?php foreach($reasons as $key => $value) { ?>
                    <div class="ifs-field">
                        <label><input type="radio" name="ifs-reason" value="<?php echo esc_attr($key); ?>"><?php echo esc_attr($value["label"]); ?></label>
                        <?php if(isset($value["input"])) { ?>
                            <input type="text" name="reason-<?php echo esc_attr($key); ?>" placeholder="<?php echo esc_attr($value["input"]); ?>">
                        <?php } ?>
                        <?php if(isset($value["text"])) { ?>
                            <p><?php echo esc_html($value["text"]); ?></p>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="ifs-footer">
            <div class="ifs-btn ifs-skip"><?php esc_html_e("Skip & Deactivate", 'ifolders'); ?></div>
            <div class="ifs-btn ifs-submit"><?php esc_html_e("Submit & Deactivate", 'ifolders'); ?></div>
        </div>
    </div>
</div>